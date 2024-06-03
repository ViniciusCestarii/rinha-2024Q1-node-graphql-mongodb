import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { Cliente, Transacao } from '../db/models';
import { createTransacao, findById, updateExtrato } from '../db/repository';
import { NotFoundError } from 'elysia';

const ClienteType = new GraphQLObjectType({
  name: 'Cliente',
  fields: () => ({
    clientId: { type: GraphQLInt },
    nome: { type: GraphQLString },
    saldo: { type: GraphQLInt },
    limite: { type: GraphQLInt }
  })
});

const TransacaoType = new GraphQLObjectType({
  name: 'Transacao',
  fields: () => ({
    valor: { type: GraphQLInt },
    tipo: { type: GraphQLString },
    descricao: { type: GraphQLString },
    clientId: { type: GraphQLInt },
    realizada_em: { type: GraphQLString }
  })
});

const SaldoTransacoesType = new GraphQLObjectType({
  name: 'SaldoTransacoes',
  fields: () => ({
    cliente: { type: ClienteType },
    saldo: {
      type: new GraphQLObjectType({
        name: 'Saldo',
        fields: {
          total: { type: GraphQLInt },
          limite: { type: GraphQLInt },
          data_extrato: { type: GraphQLString }
        }
      })
    },
    ultimas_transacoes: { type: new GraphQLList(TransacaoType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    extrato: {
      type: SaldoTransacoesType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      async resolve(parent, args) {
        const id = args.id;
        if (id > 5 || id < 1) {
          throw new NotFoundError('Client not found');
        }

        const client = await Cliente.findOne({ clientId: id });
        if (!client) {
          throw new NotFoundError('Client not found');
        }

        const transacoesResult = await Transacao.find({ clientId: id });

        return {
          cliente: client,
          saldo: {
            total: client.saldo,
            limite: client.limite,
            data_extrato: new Date().toISOString()
          },
          ultimas_transacoes: transacoesResult
        };
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    makeTransacao: {
      type: ClienteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        descricao: { type: new GraphQLNonNull(GraphQLString) },
        tipo: { type: new GraphQLNonNull(GraphQLString) },
        valor: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parent, args) {
        const { id, descricao, tipo, valor } = args;

        if (
          (tipo !== 'd' && tipo !== 'c') ||
          !descricao ||
          descricao.length > 10 ||
          descricao.length < 1 ||
          !Number.isInteger(valor) ||
          valor < 0
        ) {
          throw new Error('Invalid input');
        }

        if (id > 5 || id < 1) {
          throw new NotFoundError('Client not found');
        }

        if (tipo === 'd') {
          const extratoResult = await updateExtrato(id, valor * -1);
          if (!extratoResult) {
            throw new Error('Failed to update balance');
          }
        } else {
          await updateExtrato(id, valor);
        }

        await createTransacao({ descricao, tipo, valor, clientId: id });
        const cliente = await findById(id);

        if (!cliente) {
          throw new NotFoundError('Client not found');
        }

        return {
          clientId: cliente.clientId,
          nome: cliente.nome,
          saldo: cliente.saldo,
          limite: cliente.limite
        };
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

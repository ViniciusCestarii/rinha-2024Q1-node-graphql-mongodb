import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import { Cliente, Transacao } from '../db/models';

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
          throw new Error('Client not found');
        }

        const client = await Cliente.findOne({ clientId: id });
        if (!client) {
          throw new Error('Client not found');
        }

        const transacoesResult = await Transacao.find({ clientId: id });

        return {
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

export default new GraphQLSchema({
  query: RootQuery
});

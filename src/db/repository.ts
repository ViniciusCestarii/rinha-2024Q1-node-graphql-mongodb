import { Cliente, Transacao } from './schemas';

export const findById = async (clientId: number) => {
  return Cliente.findOne({ clientId }, 'saldo limite').exec();
};

export const updateExtrato = async (clientId: number, saldo: number) => {
  return Cliente.updateOne(
    {
      clientId,
      $expr: { $gte: [{ $sum: ['$saldo', saldo] }, { $multiply: [-1, '$limite'] }] },
    },
    { $inc: { saldo: saldo } }
  ).exec();
};
interface CreateExtratoHistory {
  descricao: string;
  tipo: string;
  valor: number;
  clientId: number; // Numeric client ID
}

export const createTransacao = async ({ valor, tipo, descricao, clientId }: CreateExtratoHistory) => {
  const transacao = new Transacao({
    valor,
    tipo,
    descricao,
    clientId,
  });

  return transacao.save();
};

export const getTransacoes = async (clientId: number) => {
  return Transacao.find({ clientId })
    .sort({ realizada_em: -1 })
    .limit(10)
    .exec();
};

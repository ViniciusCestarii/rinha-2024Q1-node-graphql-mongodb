import { Cliente, Transacao } from './schemas'

export const findById = async (clientId: number) => {
  const cliente = await Cliente.findOne({ clientId }, 'saldo limite').lean()
  return cliente
}

export const updateExtrato = async (clientId: number, saldo: number) => {
  const cliente = await Cliente.findOneAndUpdate(
    {
      clientId,
      $expr: { $gte: [{ $sum: ['$saldo', saldo] }, { $multiply: [-1, '$limite'] }] },
    },
    { $inc: { saldo: saldo } }
  ).exec()

  return cliente
}
interface CreateExtratoHistory {
  descricao: string
  tipo: string
  valor: number
  clientId: number
}

export const createTransacao = async ({ valor, tipo, descricao, clientId }: CreateExtratoHistory) => {
  const transacao = await Transacao.create(
    {
      valor,
      tipo,
      descricao,
      clientId,
    }
  )

  return transacao
}

export const getTransacoes = async (clientId: number) => {
  return Transacao.find({ clientId })
    .sort({ realizada_em: -1 })
    .limit(10)
    .exec()
}

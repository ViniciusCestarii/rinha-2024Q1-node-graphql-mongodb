import Elysia from 'elysia'
import { findById, getTransacoes } from '../../db/repository'

export const getExtrato = new Elysia().get(
  '/clientes/:id/extrato',
  async ({ set, params: { id: idParam } }) => {

    const id = parseInt(idParam)

    if (isNaN(id)) {
      set.status = 422
      return
    }

    if (id > 5 || id < 1) {
      set.status = 404
      return
    }

    const clienteResult = await findById(id)
    const cliente = clienteResult.rows[0]

    if (!cliente) {
      set.status = 404
      return
    }

    const transacoesResult = await getTransacoes(id)

    const saldoTransacoes = {
      saldo: {
        total: cliente.saldo,
        limite: cliente.limite,
        data_extrato: new Date()
      },
      ultimas_transacoes: transacoesResult.rows
    }

    set.status = 200
    return saldoTransacoes
  },
)
import Elysia from 'elysia'
import { createTransacao, findById, updateExtrato } from '../../db/repository'

export const makeTransacao = new Elysia().post(
  '/clientes/:id/transacoes',
  async ({ set, params, body }) => {
    const { id: idParam } = params
    const id = parseInt(idParam)

    const { descricao, tipo, valor } = body as any;

    if (
      tipo !== "d" && tipo !== "c" ||
      !descricao || descricao.length > 10 || descricao.length < 1 ||
      !Number.isInteger(valor) ||
      valor < 0
    ) {
      set.status = 422
      return
    }

    if (id > 5 || id < 1) {
      set.status = 404
      return
    }

    if (tipo === "d") {
      const extratoResult = await updateExtrato(id, valor * -1)
      if (extratoResult.rowCount === 0) {
        set.status = 422
        return
      }
      createTransacao({ descricao, tipo, valor, cliente_id: id })
      const clienteReturn = await findById(id)
      const cliente = clienteReturn.rows[0]

      set.status = 200
      return {
        limite: cliente.limite,
        saldo: cliente.saldo
      }
    }

    if (tipo === "c") {
      await updateExtrato(id, valor)
      createTransacao({ descricao, tipo, valor, cliente_id: id })
      const clienteReturn = await findById(id)
      const cliente = clienteReturn.rows[0]

      set.status = 200
      return {
        limite: cliente.limite,
        saldo: cliente.saldo
      }
    }
  },
)
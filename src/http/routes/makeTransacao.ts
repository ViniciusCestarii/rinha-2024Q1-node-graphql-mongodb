import Elysia, { t } from 'elysia'
import { createTransacao, findById, updateExtrato } from '../../db/repository'

export const makeTransacao = new Elysia().post(
  '/clientes/:id/transacoes',
  async ({ set, params, body }) => {
    const { id } = params
    const { descricao, tipo, valor } = body

    if (tipo !== "d" && tipo !== "c") {
      set.status = 422
      return
    }

    if (id > 5 || id < 1) {
      set.status = 404
      return
    }

    const clienteReturn = await findById(id)

    if(clienteReturn.rows.length === 0) {
      set.status = 404
      return
    }

    const cliente = clienteReturn.rows[0]

    if(tipo === "d") {
      const newSaldo = cliente.saldo - valor

      if((cliente.limite * -1) > newSaldo) {
        set.status = 422 
        return
      }

      updateExtrato(id, newSaldo)
      createTransacao({descricao, tipo, valor, cliente_id: id})

      set.status = 200
      return {
        limite: cliente.limite,
        saldo: newSaldo
      }
    }

    if(tipo === "c") {
      const newSaldo = cliente.saldo + valor

      updateExtrato(id, newSaldo)
      createTransacao({descricao, tipo, valor, cliente_id: id})

      set.status = 200
      return {
        limite: cliente.limite,
        saldo: newSaldo
      }
    }
  },
  {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
        valor: t.Integer({
          minimum: 0,
        }),
        descricao: t.String({
            minLength: 1,
            maxLength: 10,
        }),
        tipo: t.String()
    }),
  },
)
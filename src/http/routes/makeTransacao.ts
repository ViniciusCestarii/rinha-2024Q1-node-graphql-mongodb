import Router from 'koa-router'
import { createTransacao, findById, updateExtrato } from '../../db/repository'

export const makeTransacao = new Router().post('/clientes/:id/transacoes', async (ctx) => {
  const { id: idParam } = ctx.params;
  const id = parseInt(idParam);

  const { descricao, tipo, valor } = ctx.request.body as {
    descricao: string;
    tipo: string;
    valor: number;
  };

  if (
    (tipo !== 'd' && tipo !== 'c') ||
    !descricao ||
    descricao.length > 10 ||
    descricao.length < 1 ||
    !Number.isInteger(valor) ||
    valor < 0
  ) {
    ctx.status = 422;
    ctx.body = { error: 'Invalid input' };
    return;
  }

  if (id > 5 || id < 1) {
    ctx.status = 404;
    ctx.body = { error: 'Client not found' };
    return;
  }

  if (tipo === 'd') {
    const extratoResult = await updateExtrato(id, valor * -1);
    if (!extratoResult) {
      ctx.status = 422;
      ctx.body = { error: 'Failed to update balance' };
      return;
    }
  } else {
    await updateExtrato(id, valor);
  }

  await createTransacao({ descricao, tipo, valor, clientId: id });
  const cliente = await findById(id);

  if (!cliente) {
    ctx.status = 404;
    ctx.body = { error: 'Client not found' };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    limite: cliente.limite,
    saldo: cliente.saldo,
  };
});
import Router from 'koa-router';
import { findById, getTransacoes } from '../../db/repository';

export const getExtrato = new Router().get('/clientes/:id/extrato', async (ctx) => {
  const { id: idParam } = ctx.params;
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    ctx.status = 422;
    ctx.body = 'Invalid ID';
    return;
  }

  if (id > 5 || id < 1) {
    ctx.status = 404;
    ctx.body = 'Client not found';
    return;
  }

  const client = await findById(id);

  if (!client) {
    ctx.status = 404;
    ctx.body = 'Client not found';
    return;
  }

  const transacoesResult = await getTransacoes(id);

  const saldoTransacoes = {
    saldo: {
      total: client.saldo,
      limite: client.limite,
      data_extrato: new Date(),
    },
    ultimas_transacoes: transacoesResult.length,
  };

  ctx.status = 200;
  ctx.body = saldoTransacoes;
});

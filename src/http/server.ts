import { getExtrato } from "./routes/getExtrato";

import Koa from 'koa'
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { makeTransacao } from "./routes/makeTransacao";

const app = new Koa();
const router = new Router();

// Attach routes
router.use(makeTransacao.routes());
router.use(getExtrato.routes());

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error: any) {
    ctx.status = 500;
    console.error(error);
    ctx.body = { error: error.message };
  }
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.silent = false;

const port = process.env.HTTP_PORT ?? 3000;
app.listen(port, () => {
  console.log(`🔥 HTTP server running at http://localhost:${port}`);
});
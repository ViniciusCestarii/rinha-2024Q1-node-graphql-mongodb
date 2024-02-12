import { Elysia } from 'elysia'
import { makeTransacao } from './routes/makeTransacao'
import { getExtrato } from './routes/getExtrato'


const app = new Elysia()
  .use(getExtrato)
  .use(makeTransacao)

app.listen(3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
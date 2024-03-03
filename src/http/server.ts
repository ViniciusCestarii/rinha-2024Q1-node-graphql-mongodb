import { Elysia } from 'elysia'
import { makeTransacao } from './routes/makeTransacao'
import { getExtrato } from './routes/getExtrato'

const app = new Elysia()
  .use(getExtrato)
  .use(makeTransacao)
  .onError(({ set, error }) => {
    return new Response(error.message, { status: 500 })
  })

app.listen(process.env.HTTP_PORT ?? 3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
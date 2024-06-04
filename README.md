# Koa with Bun

## Desafio do [Sibelius Seraphini](https://twitter.com/sseraphini/status/1785287978509537790)

Esse projeto usa a stack da woovi (node, mongodb e graphql) para resolver a [segunda edição da Rinha de Backend](https://github.com/zanfranceschi/rinha-de-backend-2024-q1)

## Instalação

1. configure .env file

2. Run docker containers
```bash
docker-compose up
```

3. [Open graphql](http://localhost:9999/graphql) page and start to query

- query to fetch client "extrato"
```
query {
  extrato(id: 2) {
    cliente {
      nome
    }
    saldo {
      total
      limite
      data_extrato
    }
    ultimas_transacoes {
      valor
      tipo
      descricao
      realizada_em
    }
  }
}
```

- mutation to make a transaction
```
mutation {
  makeTransacao(id: 1, descricao: "Compra", tipo: "d", valor: 100) {
    clientId
    nome
    saldo
    limite
  }
}
```

import pool from "./db";

export const findById = (id: number) => {
    const query = `
    SELECT
        saldo,
        limite
    FROM
        clientes
    WHERE "id" = $1;
    `
    return pool.query(query, [id]);
}

export const updateExtrato = (id: number, saldo: number) => {
    const query = `
    UPDATE clientes
    SET saldo = saldo + $1 
    WHERE id = $2
    AND (saldo + $1 >= -limite);
    `
    return pool.query(query, [saldo, id]);
}

interface CreateExtratoHistory {
    descricao: string;
    tipo: string;
    valor: number;
    cliente_id: number;
}

export const createTransacao = ({ valor, tipo, descricao, cliente_id }: CreateExtratoHistory) => {
    const query = `
    INSERT INTO transacoes (valor, tipo, descricao, cliente_id)
            VALUES
            ($1, $2, $3, $4);
            `
    return pool.query(query, [valor, tipo, descricao, cliente_id]);
}

export const getTransacoes = (id: number) => {
    const query = `
    SELECT valor, tipo, descricao, realizada_em
    FROM transacoes
    WHERE cliente_id = $1
    ORDER BY realizada_em DESC
    LIMIT 10;
    `

    return pool.query(query, [id]);
}


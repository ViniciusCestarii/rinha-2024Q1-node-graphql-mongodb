CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL NOT NULL PRIMARY KEY,
    limite integer NOT NULL,
    saldo integer DEFAULT 0 NOT NULL,
    nome character varying(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS transacoes (
    id SERIAL NOT NULL PRIMARY KEY,
    valor INTEGER NOT NULL,
    tipo CHARACTER VARYING(1) NOT NULL,
    descricao CHARACTER VARYING(10) NOT NULL,
    realizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cliente_id INTEGER NOT NULL
);

DO $$
BEGIN
    INSERT INTO clientes (nome, limite)
    VALUES
    ('o barato sai caro', 1000 * 100),
    ('zan corp ltda', 800 * 100),
    ('les cruders', 10000 * 100),
    ('padaria joia de cocaia', 100000 * 100),
    ('kid mais', 5000 * 100);
END; $$

import pg from 'pg'
const URL = process.env.DB_URL ?? 'postgres://rinha:123@localhost:5432/admin'

const pool = new pg.Pool({
    connectionString: URL,
    max: (Number(process.env.DB_POOL) || 200),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000
})

pool.on('error', connect)

pool.once('connect', async () => {
    console.log(`database: Connected  to db ${URL}`)
    console.log(`Creating table "clientes" and "ultimas_trasacao" if not exists`);
    await pool.query(`

        CREATE TABLE IF NOT EXISTS clientes (
            id SERIAL NOT NULL PRIMARY KEY,
            limite integer NOT NULL,
            saldo integer DEFAULT 0 NOT NULL,
            nome character varying(255) NOT NULL
        );
        `)
    pool.query(`

        CREATE TABLE IF NOT EXISTS transacoes (
            id SERIAL NOT NULL PRIMARY KEY,
            valor INTEGER NOT NULL,
            tipo CHARACTER VARYING(1) NOT NULL,
            descricao CHARACTER VARYING(10) NOT NULL,
            realizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

            cliente_id INTEGER NOT NULL
        );
        `)
    // remover depois
    const countClients = await pool.query(`SELECT COUNT(*) FROM clientes;`);
    if (countClients.rows[0].count === "0") {
        console.log(`Inserting into clientes`);
         pool.query(`
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
            `)
        }
    return
});

async function connect() {
    try {
        console.log(`Connecting to db ${URL}`);
        await pool.connect();
    } catch (err) {
        setTimeout(() => {
            connect();
            console.error(`database.js: an error occured when connecting ${err} retrying connection on 3 secs`);
        }, 3000)
    }
}

connect();

export default pool;

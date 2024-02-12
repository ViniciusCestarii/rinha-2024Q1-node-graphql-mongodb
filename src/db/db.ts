import pg from 'pg'
const URL = process.env.DB_URL ?? 'postgres://admin:123@db:5432/rinha'

const pool = new pg.Pool({
    connectionString: URL,
    max: (Number(process.env.DB_POOL) || 200),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000
})

pool.on('error', connect)

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

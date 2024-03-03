import pg from 'pg'
const URL = process.env.DB_URL ?? 'postgres://admin:123@localhost:5432/rinha'

const pool = new pg.Pool({
    connectionString: URL,
})

export default pool;

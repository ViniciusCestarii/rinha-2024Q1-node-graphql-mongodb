import "dotenv/config";

import pg from 'pg'
const {POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB } = process.env

const pool = new pg.Pool({
    user: POSTGRES_USER, 
    host: 'db',                       
    database: POSTGRES_DB, 
    password: POSTGRES_PASSWORD, 
    port: 5432,                       
  });

export default pool;

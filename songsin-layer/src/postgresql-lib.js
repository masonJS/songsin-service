const { PostgreSQL: { CONNECT }} = require('fxsql')
const CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}
const POOL = CONNECT(CONFIG)

exports.POOL = POOL

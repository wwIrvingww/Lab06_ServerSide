// import mysql from 'mysql2/promise'

// const pool = mysql.createPool({
//   host: 'localhost',
//   port: 33068,
//   user: 'blog_user',
//   database: 'blog_db',
//   password: 'blog_password',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// })

// export default pool

import pg from 'pg'
const { Client } = pg

const connectionData = {

  user: process.env.db_user,
  host: process.env.db_host, //SUSTITUIR EL RESTO DE VARIABLES DE ENTORNO
  database: process.env.db_database,
  password: process.env.db_password,
  port: 5432,

}

const client = new Client(connectionData)
await client.connect()

export default client
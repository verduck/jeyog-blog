import knex from 'knex'

export default knex({
  client: 'mysql2',
  connection: {
    host: process.env.NEXT_PUBLIC_DATABASE_HOST,
    port: 3306,
    user: process.env.NEXT_PUBLIC_DATABASE_USER,
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    database: process.env.NEXT_PUBLIC_DATABASE_DATABASE,
  },
})

module.exports = {
  host:     process.env.PGHOST     || '127.0.0.1',
  port:     process.env.PGPORT     || 5432,
  user:     process.env.PGUSER     || 'postgres',
  password: process.env.PGPASSWORD || 'passpg',
  database: process.env.PGDATABASE || 'postgres'
}

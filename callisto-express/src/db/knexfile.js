
const knexfile = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "UserName",
      password:"Password",
      database: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: __dirname + '/apis/**/*entity.*'
    },
  },
};

export default knexfile;
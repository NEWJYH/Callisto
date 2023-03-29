import { knexSnakeCaseMappers } from "objection";

const knexfile = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "UserName",
      password: "Password",
      database: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
    },
    seeds: './seeds',
    ...knexSnakeCaseMappers,
  },
};

export default knexfile;

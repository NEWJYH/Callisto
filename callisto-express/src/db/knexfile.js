
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

/************************************************************
 * 파 일 명 : knexfile.js
 * 설    명 : Knex ORM 데이터베이스 설정 파일 
 * 
 * 수정일       수정자          Version      Description
 * ----------  --------------  ---------   -----------
 * 2023.03.31  정영훈           1.0         최초 생성
 * **********************************************************/
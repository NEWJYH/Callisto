import knexfile from "./knexfile";

import knex from "knex";

// TODO: 운영 환경에서는 의존서주입(DI)을 사용하여
// knex 인스턴스를 생성하므로, 테스트를 위해 DB 접근
// for tests

// TODO: 운영환경에서는 환경 변수를 사용하여 어떤 설정을 사용할지 결정하므로
// 직접 config.development에 접근하지 않도록 합니다.
const db = knex(knexfile.development);

export default db;

// yarn knex migrate:make init --migrations-directory db/migrations

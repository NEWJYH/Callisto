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

/************************************************************
 * 파 일 명 : db.js
 * 설    명 : 데이터베이스 연결을 위한 knex 인스턴스 생성파일
 * 
 * 수정일       수정자          Version      Description
 * ----------  --------------  ---------   -----------
 * 2023.03.31  정영훈           1.0         최초 생성
 * **********************************************************/
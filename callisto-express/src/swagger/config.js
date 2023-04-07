export const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: '게시판 API',
          version: '1.0.0',
      },
  },
  apis: ['./src/swagger/*.swagger.js'], // files containing annotations as above
};

/************************************************************
 * 파 일 명 : config.js
 * 설    명 : Swagger 설정 파일 
 * 
 * 수정일       수정자          Version      Description
 * ----------  --------------  ---------   -----------
 * 2023.03.31  정영훈           1.0         최초 생성
 * **********************************************************/
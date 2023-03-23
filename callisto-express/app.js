import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import { PingRouter } from "./apis/pings/ping.router.js";

const app = express();
const port = 3000;

app.use(express.json());

// swagger 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// test 환경 cors 설정
app.use(
  cors([
    {
      origin: "http://localhost:3000",
      credentials: true,
    },
  ])
);

// ping
const pingRouter = new PingRouter().getRouter;
app.use("/", pingRouter);

app.listen(port, () => {
  console.log(`express_app listening on port ${port}`);
});

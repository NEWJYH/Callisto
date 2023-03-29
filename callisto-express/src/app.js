import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import { PingRouter } from "./apis/pings/ping.router.js";
import { BoardRouter } from "./apis/boards/board.router.js";
import "dotenv/config";

const app = express();

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

// Router
const pingRouter = new PingRouter().getRouter;
const boardRouter = new BoardRouter().getRouter;

app.use("/", pingRouter);
app.use("/board", boardRouter);

console.log(app.get('env'));

export default app;

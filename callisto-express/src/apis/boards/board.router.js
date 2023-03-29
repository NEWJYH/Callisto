
import  express  from 'express';
import { BoardController } from './board.controller.js';
import { BoardService } from './board.service.js';

export class BoardRouter {
  constructor() {
    this.router = express.Router();
    this.boardService = new BoardService();
    this.boardController = new BoardController(this.boardService)
    
    this.setRoutes();
  
  }

  setRoutes(){
    // create
    // this.router.post("/", this.boardController)
    // read_all 전체 조회
    // this.router.get("/", this.boardController)
    // read 특정 게시글 조회
    // this.router.get("/:board_id", this.boardController)
    // update
    // this.router.put("/:board_id", this.boardController)
    // delete
    // this.router.delete("/:board_id", this.boardController)
  }

  get getRouter() {
    return this.router;
  }
}
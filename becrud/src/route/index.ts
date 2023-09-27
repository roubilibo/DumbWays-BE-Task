import * as express from "express";
import TodoController from "../controllers/TodoController";

const router = express.Router();
router.post("/paslon", TodoController.create);
router.get("/paslons", TodoController.find)
export default router;

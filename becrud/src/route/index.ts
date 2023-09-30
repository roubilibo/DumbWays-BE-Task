import * as express from "express";
import TodoController from "../controllers/TodoController";

const router = express.Router();
router.post("/paslon", TodoController.create);
router.get("/paslons", TodoController.find);
router.get("/paslon/:id", TodoController.findById);
router.patch("/paslon/:id", TodoController.update);
router.delete("/paslon/:id", TodoController.deleteById);
export default router;

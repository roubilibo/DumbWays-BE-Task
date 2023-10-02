import * as express from "express";
import TodoController from "../controllers/TodoController";
import UploadImage from "../middlewares/UploadImage";

const router = express.Router();
router.post("/paslon", UploadImage.single("image"), TodoController.create);
router.get("/paslons", TodoController.find);
router.get("/paslon/:id", TodoController.findById);
router.patch("/paslon/:id", UploadImage.single("image"), TodoController.update);
router.delete("/paslon/:id", TodoController.deleteById);
export default router;

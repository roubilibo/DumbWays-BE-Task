import { Request, Response } from "express";
import TodosService from "../service/TodoService";

export default new (class TodoController {
	create(req: Request, res: Response) {
		TodosService.create(req, res);
	}
	find(req: Request, res: Response) {
		TodosService.find(req, res);
	}
})();

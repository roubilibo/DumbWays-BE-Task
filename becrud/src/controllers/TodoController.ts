import { Request, Response } from "express";
import PaslonService from "../service/PaslonService";

export default new (class TodoController {
	create(req: Request, res: Response) {
		PaslonService.create(req, res);
	}
	find(req: Request, res: Response) {
		PaslonService.find(req, res);
	}
	findById(req: Request, res: Response) {
		PaslonService.findById(req, res);
	}
	update(req: Request, res: Response) {
		PaslonService.update(req, res);
	}
	deleteById(req: Request, res: Response) {
		PaslonService.deleteById(req, res);
	}
})();

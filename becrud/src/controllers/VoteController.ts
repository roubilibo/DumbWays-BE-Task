import { Request, Response } from "express";
import VoteService from "../service/VoteService";

export default new (class VoteController {
	find(req: Request, res: Response) {
		VoteService.find(req, res);
	}
	create(req: Request, res: Response) {
		VoteService.create(req, res);
	}
})();

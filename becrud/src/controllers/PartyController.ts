import { Request, Response } from "express";
import PartyService from "../service/PartyService";

export default new (class PartyControllers {
	findAll(req: Request, res: Response) {
		PartyService.findAll(req, res);
	}
})();

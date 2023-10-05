import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Votes } from "../entities/vote";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createVoteSchema } from "../utils/Validation";

export default new (class VoteServices {
	private readonly VoteRepository: Repository<Votes> =
		AppDataSource.getRepository(Votes);
	private readonly PaslonRepository: Repository<Paslon> =
		AppDataSource.getRepository(Paslon);

	async find(req: Request, res: Response) {
		try {
			const votes = await this.VoteRepository.find({
				relations: ["paslon"],
			});
			return res.status(200).json({
				code: 200,
				data: votes,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				code: 500,
				error: "Error",
			});
		}
	}
})();

import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Party } from "../entities/Party";
import { AppDataSource } from "../data-source";

class PartyServices {
	private readonly PartyRepository: Repository<Party> =
		AppDataSource.getRepository(Party);

	async findAll(req: Request, res: Response) {
		try {
			const parties = await this.PartyRepository.find({
				select: ["id", "name", "createdAt", "updatedAt"],
			});

			return res.status(200).json({
				code: 200,
				data: parties,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				code: 500,
				error: "Internal Server Error",
			});
		}
	}
}

export default new PartyServices();

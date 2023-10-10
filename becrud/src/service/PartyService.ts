import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Party } from "../entities/Party";
import { AppDataSource } from "../data-source";
import { createPartySchema } from "../utils/Validation";
import { number } from "joi";

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

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = createPartySchema.validate(data);
			if (error) return res.status(400).json({ code: 400, error });

			const newParty = await this.PartyRepository.create(data);
			await this.PartyRepository.save(newParty);

			return res.status(200).json({
				code: 200,
				data: newParty,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				code: 500,
				error: "Internal Server Error",
			});
		}
	}

	async findById(req: Request, res: Response): Promise<Response> {
		try {
			const id = req.params.id;

			const partyDetail = await this.PartyRepository.findOneBy({
				id: Number(id),
			});

			if (!partyDetail) {
				return res.status(404).json({
					code: 404,
					error: "Party Not Found",
				});
			}

			return res.status(200).json({
				code: 200,
				data: partyDetail,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				code: 500,
				error: "Internal Server Error",
			});
		}
	}

	async updateById(req: Request, res: Response): Promise<Response> {
		try {
			const id = req.params.id;
			const data = req.body;

			const { error } = createPartySchema.validate(data);
			if (error) return res.status(400).json({ code: 400, error });

			const partyDetail = await this.PartyRepository.findOneBy({
				id: Number(id),
			});
			if (!partyDetail) {
				return res.status(404).json({
					code: 404,
					error: "Party Not Found",
				});
			}

			partyDetail.name = data.name;
			partyDetail.updatedAt = new Date();

			await this.PartyRepository.save(partyDetail);

			return res.status(200).json({
				code: 200,
				data: partyDetail,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				code: 500,
				error: "Internal Server Error",
			});
		}
	}

	async deleteById(req: Request, res: Response) {
		try {
			const id = req.params.id;

			const partyDetail = await this.PartyRepository.findOneBy({
				id: Number(id),
			});
			if (!partyDetail) {
				return res.status(404).json({
					code: 404,
					error: "Party Not Found",
				});
			}

			await this.PartyRepository.delete(id);

			return res.status(200).json({
				code: 200,
				data: {},
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

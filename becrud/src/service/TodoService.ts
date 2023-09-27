import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createTodoSchema } from "../utils/Todos";
import { Request, Response, response } from "express";

export default new (class TodosService {
	private readonly TodoRepository: Repository<Paslon> =
		AppDataSource.getRepository(Paslon);

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;
			const { error } = createTodoSchema.validate(data);

			if (error) return res.status(400).json({ error: error });

			const obj = this.TodoRepository.create({
				name: data.name,
				visi: data.visi,
				image: data.image,
			});
			const todos = this.TodoRepository.save(obj);
			return res.status(200).json(todos);
		} catch (error) {
			return res.status(500).json({ error: "error while insterting data!" });
		}
	}
	async find(req: Request, res: Response): Promise<Response> {
		try {
			const paslons = await this.TodoRepository.find();
			return res.status(200).json(paslons);
		} catch (error) {
			return res.status(500).json({ error: "error while finding data!" });
		}
	}
})();

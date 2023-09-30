import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createTodoSchema, updateTodoSchema } from "../utils/Todos";
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
	async findById(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			if (isNaN(id) || id <= 0)
				return res.status(400).json({ Error: "Invalid id" });

			const todo = await this.TodoRepository.findOneBy({ id: Number(id) });

			if (!todo) {
				return res.status(404).json({ error: "ID not found" });
			}

			return res.status(200).json(todo);
		} catch (error) {
			return res.status(500).json({ error: "Error while finding data!" });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const data = req.body;
			const { error } = updateTodoSchema.validate(data);

			if (error) return res.status(400).json({ error: error });

			const todo = await this.TodoRepository.findOneBy({ id: Number(id) });

			if (!todo) {
				return res.status(404).json({ error: "ID not found" });
			}

			todo.name = data.name;
			todo.visi = data.visi;
			todo.image = data.image;

			const updatedTodo = await this.TodoRepository.save(todo);
			return res.status(200).json(updatedTodo);
		} catch (error) {
			return res.status(500).json({ error: "Error while updating data!" });
		}
	}
	async deleteById(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);

			const todo = await this.TodoRepository.findOneBy({ id: Number(id) });

			if (!todo) {
				return res.status(404).json({ error: "ID not found" });
			}

			await this.TodoRepository.delete(id);

			return res.status(200).json({ message: "Paslon deleted successfully" });
		} catch (error) {
			return res.status(500).json({ error: "Error while deleting data!" });
		}
	}
})();

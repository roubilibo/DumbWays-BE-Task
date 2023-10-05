import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createTodoSchema, updateTodoSchema } from "../utils/Validation";
import { Request, Response, response } from "express";
import { deleteFile } from "../utils/FileHelper";
import { uploadToCloudinary } from "../utils/Cloudinary";

export default new (class PaslonServices {
	private readonly PaslonRepository: Repository<Paslon> =
		AppDataSource.getRepository(Paslon);

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;
			const { error } = createTodoSchema.validate(data);

			if (error) return res.status(400).json({ error: error });

			let image =
				"https://res.cloudinary.com/dtha7yn1x/image/upload/v1696230488/IMG_20200329_164405_vpmtan.jpg";
			if (req.file?.filename) {
				// save to cloudinary
				image = await uploadToCloudinary(req.file);
				// delete file from local server after save to cloudinary
				deleteFile(req.file.path);
			}

			const obj = this.PaslonRepository.create({
				name: data.name,
				visi: data.visi,
				image: image,
			});
			const todos = this.PaslonRepository.save(obj);
			return res.status(200).json(obj);
		} catch (error) {
			return res.status(500).json({ error: "error while insterting data!" });
		}
	}
	async find(req: Request, res: Response): Promise<Response> {
		try {
			const paslons = await this.PaslonRepository.find();
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

			const todo = await this.PaslonRepository.findOneBy({ id: Number(id) });

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

			const todo = await this.PaslonRepository.findOneBy({ id: Number(id) });

			if (!todo) {
				return res.status(404).json({ error: "ID not found" });
			}

			// default image
			let image =
				"https://res.cloudinary.com/dtha7yn1x/image/upload/v1696230488/IMG_20200329_164405_vpmtan.jpg";
			if (req.file?.filename) {
				// save to cloudinary
				image = await uploadToCloudinary(req.file);
				// delete file from local server after save to cloudinary
				deleteFile(req.file.path);
			}

			todo.name = data.name;
			todo.visi = data.visi;
			todo.image = data.image;

			const updatedTodo = await this.PaslonRepository.save(todo);
			return res.status(200).json(updatedTodo);
		} catch (error) {
			return res.status(500).json({ error: "Error while updating data!" });
		}
	}
	async deleteById(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);

			const todo = await this.PaslonRepository.findOneBy({ id: Number(id) });

			if (!todo) {
				return res.status(404).json({ error: "ID not found" });
			}

			await this.PaslonRepository.delete(id);

			return res.status(200).json({ message: "Paslon deleted successfully" });
		} catch (error) {
			return res.status(500).json({ error: "Error while deleting data!" });
		}
	}
})();

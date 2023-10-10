import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/User";
import { registerSchema, loginSchema } from "../utils/Validation";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthServices {
	private readonly UserRepository: Repository<Users> =
		AppDataSource.getRepository(Users);

	async register(req: Request, res: Response) {
		try {
			const data = req.body;

			const { error, value } = registerSchema.validate(data);

			if (error) {
				return res.status(500).json({
					error: error.details[0].message,
				});
			}

			const checkEmail = await this.UserRepository.count({
				where: {
					email: value.email,
				},
			});

			if (checkEmail > 0) {
				return res.status(400).json({ error: "Email is already registered!" });
			}

			const password = await bcrypt.hash(value.password, 10);

			const user = this.UserRepository.create({
				fullName: value.fullName,
				email: value.email,
				password: password,
			});

			const createdUser = await this.UserRepository.save(user);
			delete createdUser.password;

			return res.status(201).json({
				code: 201,
				data: createdUser,
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

export default new AuthServices();

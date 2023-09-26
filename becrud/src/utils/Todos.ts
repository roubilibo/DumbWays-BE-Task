import * as joi from "joi";

export const createTodoSchema = joi.object({
	name: joi.string().required(),
	visi: joi.string().required(),
	image: joi.string().required()
})

import * as joi from "joi";

export const createTodoSchema = joi.object({
	name: joi.string().required()
})

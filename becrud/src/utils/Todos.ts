import * as joi from "joi";

export const createTodoSchema = joi.object({
	name: joi.string().required(),
	visi: joi.string().required(),
});
export const updateTodoSchema = joi.object({
	name: joi.string(),
	visi: joi.string(),
});

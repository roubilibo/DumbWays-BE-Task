import * as joi from "joi";
import Joi = require("joi");

export const createTodoSchema = joi.object({
	name: joi.string().required(),
	visi: joi.string().required(),
});

export const updateTodoSchema = joi.object({
	name: joi.string(),
	visi: joi.string(),
});

export const createVoteSchema = Joi.object({
	paslonId: Joi.number().required(),
	voterName: joi.string().required(),
});

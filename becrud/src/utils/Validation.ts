import * as joi from "joi";
import Joi = require("joi");

export const createTodoSchema = Joi.object({
	name: joi.string().required(),
	visi: joi.string().required(),
});

export const updateTodoSchema = Joi.object({
	name: joi.string(),
	visi: joi.string(),
});

export const createVoteSchema = Joi.object({
	voterName: joi.string().required(),
	paslonId: Joi.number().required(),
});

export const createPartySchema = Joi.object({
	name: Joi.string().required(),
});

export const registerSchema = Joi.object({
	fullName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(8),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

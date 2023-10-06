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
	voterName: joi.string().required(),
	paslonId: Joi.number().required(),
});

export const createPartySchema = joi.object({
	name: Joi.string().required(),
});

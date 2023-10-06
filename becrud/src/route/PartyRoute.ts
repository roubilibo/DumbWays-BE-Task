import * as express from "express";
import PartyController from "../controllers/PartyController";

const PartyRoute = express.Router();
PartyRoute.get("/parties", PartyController.findAll);

export default PartyRoute;

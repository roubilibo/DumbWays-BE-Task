import * as express from "express";
import VoteController from "../controllers/VoteController";

const VoteRoute = express.Router();
VoteRoute.get("/votes", VoteController.find);

export default VoteRoute;

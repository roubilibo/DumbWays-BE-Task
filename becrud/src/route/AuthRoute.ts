import * as express from "express";
import AuthController from "../controllers/AuthController";
import { authenticate } from "../middlewares/JwtChecking";

const AuthRoute = express.Router();
AuthRoute.post("/auth/register", AuthController.register);
// AuthRoute.post("/auth/login", AuthController.login);
// AuthRoute.get("/auth/check", authenticate, AuthController.check);

export default AuthRoute;

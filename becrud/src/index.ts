import * as express from "express";
import { AppDataSource } from "./data-source";
import router from "./route";
import VoteRoute from "./route/VoteRoute";
import * as cors from "cors";

AppDataSource.initialize()
	.then(async () => {
		const app = express();
		const port = 5000;

		// !WAJIB
		// const corsOption = {
		// 	origin: "*",
		// 	methods: ["GET", "POST", "PATCH", "DELETE"],
		// 	allowHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
		// };
		const options: cors.CorsOptions = {
			allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
			credentials: true,
			methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
			origin: "*",
			preflightContinue: false,
		};
		// ?optional
		// exposedHeaders, credentials, maxAge, perFlightContinue, OptionSuccessStatus,

		app.use(cors(options));
		app.use(express.json());
		app.use("/api/v1", router);
		app.use("/api/v1", VoteRoute);
		app.listen(port, () => `Server started on port ${port}`);
	})
	.catch((error) => console.log(error));

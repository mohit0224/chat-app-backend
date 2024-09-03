import envConfig from "./env.config.js";

const wsCorsOption = {
	cors: {
		origin: envConfig.CORS_ORIGIN, // Replace with your client URL
		methods: ["GET", "POST"],
		credentials: true,
	},
};

export default wsCorsOption;

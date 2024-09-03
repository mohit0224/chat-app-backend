import envConfig from "./env.config";

const wsCorsOption = {
	cors: {
		origin: envConfig.CORS_ORIGIN, // Replace with your client URL
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
};

export default wsCorsOption;

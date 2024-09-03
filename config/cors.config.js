import envConfig from "./env.config.js";

const corsOption = {
	origin: envConfig.CORS_ORIGIN,
	credentials: true,
};

export default corsOption;

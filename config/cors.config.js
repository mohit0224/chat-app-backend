import envConfig from "./env.config";

const corsOption = {
	origin: envConfig.CORS_ORIGIN,
	credentials: true,
};

export default corsOption;

const envConfig = {
	MONGODB_URI: String(process.env.MONGODB_URI),
	MONGODB_NAME: String(process.env.MONGODB_NAME),
	BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT),
	JWT_SECRET: String(process.env.JWT_SECRET),
	FRONTEND_URI: String(process.env.FRONTEND_URI),
};

export default envConfig;

const allowedOrigins = process.env.CORS_ORIGIN;

const corsOption = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	optionsSuccessStatus: 204,
	maxAge: 600,
};

export default corsOption;

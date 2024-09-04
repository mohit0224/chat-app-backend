const helmetConfig = {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'"],
			styleSrc: ["'self'"],
		},
	},
	frameguard: {
		action: "deny",
	},
	hidePoweredBy: true,
	hsts: {
		maxAge: 31536000,
		includeSubDomains: true,
		preload: true,
	},
};

export default helmetConfig;

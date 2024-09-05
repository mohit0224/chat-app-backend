const helmetConfig = (uri) => {
	return {
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"], // Allow resources from the same origin
				scriptSrc: [
					"'self'", // Allow scripts from the same origin
					uri, // Replace with your Vercel domain
					// "https://cdn.jsdelivr.net", // Example: for external scripts
				],
				styleSrc: [
					"'self'",
					"'unsafe-inline'", // Allow inline styles
					"https://fonts.googleapis.com", // Example: for Google Fonts
				],
				fontSrc: [
					"'self'",
					"https://fonts.gstatic.com", // Example: for Google Fonts
				],
				imgSrc: [
					"'self'",
					"data:", // Allow inline images (e.g., base64)
					uri, // Allow images from your Vercel React app
				],
				connectSrc: [
					"'self'",
					uri, // Allow API calls to your React app hosted on Vercel
				],
				frameSrc: ["'self'"],
				objectSrc: ["'none'"], // Disallow <object>, <embed>, <applet> tags
			},
		},
		frameguard: {
			action: "deny",
		},
		hsts: {
			maxAge: 31536000,
			includeSubDomains: true,
			preload: true,
		},
		referrerPolicy: {
			policy: "strict-origin-when-cross-origin",
		},
		hidePoweredBy: true,
		noSniff: true,
		ieNoOpen: true,
		xssFilter: true,
	};
};

export default helmetConfig;

const isProduction = process.env.NODE_ENV === "production";

const isRedirect = (req, res, next) => {
	if (isProduction) {
		if (req.secure) {
			return next();
		}
		res.redirect(`https://${req.headers.host}${req.url}`);
	} else {
		next();
	}
};

export default isRedirect;

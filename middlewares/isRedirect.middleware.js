import logger from "../logger.js";

const isProduction = process.env.NODE_ENV === "production";
logger.info(process.env.NODE_ENV);

const isRedirect = (req, res, next) => {
	if (isProduction) {
		if (req.secure) {
			logger.info(req.secure);

			return next();
		}
		res.redirect(`https://${req.headers.host}${req.url}`);
	}

	next();
};

export default isRedirect;

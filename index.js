import server from "./app.js";
import dbConnect from "./config/dbConnect.config.js";
const port = process.env.PORT || 8080;

dbConnect()
	.then(() => {
		server.listen(port, () => {
			console.log(`server listening on port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

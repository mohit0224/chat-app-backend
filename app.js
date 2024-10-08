import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.routes.js";
import corsOption from "./config/cors.config.js";
import wsCorsOption from "./config/wsCors.config.js";
import logger from "./logger.js";

const app = express();
const server = createServer(app);
export const io = new Server(server, wsCorsOption);
const morganFormat = ":method :url :status :response-time ms";

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	morgan(morganFormat, {
		stream: {
			write: (message) => {
				const logObject = {
					method: message.split(" ")[0],
					url: message.split(" ")[1],
					status: message.split(" ")[2],
					responseTime: message.split(" ")[3],
				};
				logger.info(JSON.stringify(logObject));
			},
		},
	})
);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------

const users = {};

io.on("connection", (socket) => {
	console.log(`Client connect with socket :: ${socket.id}`);
	const userId = socket.handshake.query.userId;
	if (userId !== "undefined") {
		users[userId] = socket.id;
	}
	io.emit("getOnline", Object.keys(users));

	socket.on("disconnect", () => {
		delete users[userId];
		io.emit("getOnline", Object.keys(users));
	});
});

export const getRealtimeMessage = (receiverId) => {
	if (!users[receiverId]) {
		console.log(`No user found with receiverId: ${receiverId}`);
		return null;
	}

	const id = users[receiverId];
	return id;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------

app.use("/api/v1/users", userRoute);
app.use("/api/v1/messages", messageRoute);

export default server;

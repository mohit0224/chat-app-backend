import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
const messageRoute = Router();

messageRoute.post("/send-message/:id", isLoggedIn, sendMessage);
messageRoute.get("/get-message/:id", isLoggedIn, getMessage);

export default messageRoute;

import { Router } from "express";
import {
	checkCookies,
	createAccount,
	getAllUser,
	loginAccount,
	logoutAccount,
} from "../controllers/user.controllers.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
const userRoute = Router();

userRoute.post("/", createAccount);
userRoute.post("/login", loginAccount);
userRoute.post("/logout", isLoggedIn, logoutAccount);
userRoute.get("/check-cookie", checkCookies);

// ----------------------------------------------------------------

userRoute.get("/", isLoggedIn, getAllUser);

export default userRoute;

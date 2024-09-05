import { signupValidation, loginValidation } from "../schema/user.schema.js";
import { httpError, httpResponse } from "../utils/httpRes.utils.js";
import User from "../models/user.models.js";
import { generateToken } from "../utils/jwt.utils.js";

const cookieOption = {
	httpOnly: true,
	secure: true,
	sameSite: "None",
	maxAge: 1 * 60 * 60 * 1000,
};

const createAccount = async (req, res) => {
	try {
		const data = req.body;
		const { error } = signupValidation(data);
		if (error) {
			return res.status(400).json(httpError(error.details[0].message, false));
		}

		const existsUSer = await User.findOne({ email: data.email });
		if (existsUSer) {
			return res.status(409).json(httpError("Email already exists !!", false));
		}

		const newUser = new User({ ...data });
		await newUser.save();

		res.status(201).json(httpResponse("user created !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const loginAccount = async (req, res) => {
	try {
		const data = req.body;
		const { error } = loginValidation(data);
		if (error) {
			return res.status(500).json(httpError(error.details[0].message, false));
		}

		const checkUser = await User.findOne({ email: data.email });
		if (!checkUser) {
			return res.status(404).json(httpError("User not found !!", false));
		}

		const checkPassword = await checkUser.isPasswordCorrect(data.password);
		if (!checkPassword) {
			return res.status(404).json(httpError("Invalid credentials !!", false));
		}

		const token = generateToken(checkUser._id);

		const sendLoginResData = {
			_id: checkUser._id,
			name: checkUser.name,
			email: checkUser.email,
			token,
		};

		res.cookie("token", token, cookieOption);
		res
			.status(200)
			.json(httpResponse("LoggedIn successfully !!", true, sendLoginResData));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const logoutAccount = async (req, res) => {
	try {
		res.clearCookie("token");
		res.status(200).json(httpResponse("Logged out successfully !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const getAllUser = async (req, res) => {
	try {
		const users = await User.find({
			_id: { $ne: { _id: req.user.id } },
		}).select("-password");

		res.status(200).json(httpResponse("Get all users", true, users));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const checkCookies = (req, res) => {
	if (req.cookies.token) {
		res.json({ cookieExists: true });
	} else {
		res.json({ cookieExists: false });
	}
};

export { createAccount, loginAccount, logoutAccount, getAllUser, checkCookies };

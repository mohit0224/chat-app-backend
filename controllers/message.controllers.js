import { getRealtimeMessage, io } from "../app.js";
import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { httpError, httpResponse } from "../utils/httpRes.utils.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user.id;

		let conversation = await Conversation.findOne({
			participants: { $all: [receiverId, senderId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [receiverId, senderId],
			});
		}

		const newMessage = await Message({
			senderId,
			receiverId,
			message,
		});

		conversation.messages.push(newMessage._id);

		await newMessage.save();
		await conversation.save();

		const receiverSocketID = getRealtimeMessage(receiverId);
		const senderSocketID = getRealtimeMessage(req.user.id);

		if (receiverSocketID) {
			io.to(receiverSocketID).emit("new-message", newMessage);
		}

		if (senderSocketID) {
			io.to(senderSocketID).emit("new-message", newMessage);
		}

		res.status(200).json(httpResponse("Message sent !!", true, newMessage));
	} catch (err) {
		res.status(500).json(httpError(err.message, false));
	}
};

export const getMessage = async (req, res) => {
	try {
		const { id: receiverId } = req.params;
		const senderId = req.user.id;

		let conversation = await Conversation.findOne({
			participants: { $all: [receiverId, senderId] },
		}).populate("messages");

		if (!conversation) {
			return res.status(200).json(httpError("No record found !!", false, []));
		}

		res
			.status(200)
			.json(httpResponse("Message sent !!", true, conversation.messages));
	} catch (err) {
		res.status(500).json(httpError(err.message, false));
	}
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TweetSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    postDate: Date,
    userProfilePicturePath: String,
    tweet: {
        type: String,
        required: true
    },
    likes: [String],
    comments: Number,
});
const Tweet = mongoose_1.default.model("Tweet", TweetSchema);
exports.default = Tweet;

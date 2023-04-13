"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentTweetSchema = new mongoose_1.default.Schema({
    tweetId: mongoose_1.default.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});
const CommentTweet = mongoose_1.default.model("CommentTweet", CommentTweetSchema);
exports.default = CommentTweet;

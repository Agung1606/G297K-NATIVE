"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentPostSchema = new mongoose_1.default.Schema({
    postId: mongoose_1.default.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});
const CommentPost = mongoose_1.default.model("CommentPost", CommentPostSchema);
exports.default = CommentPost;

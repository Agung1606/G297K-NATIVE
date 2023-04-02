"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentsSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Post'
    },
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});
const Comments = mongoose_1.default.model("Comments", CommentsSchema);
exports.default = Comments;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FollowersSchema = new mongoose_1.default.Schema({
    followersUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
});
const Followers = mongoose_1.default.model("Followers", FollowersSchema);
exports.default = Followers;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
    },
    lastName: {
        type: String,
        trim: true,
        max: 50,
    },
    email: {
        type: String,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
    },
    birthday: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'Username exist']
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicturePath: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    followers: [
        {
            userId: String,
            username: String,
            profilePicturePath: String,
        }
    ],
    following: [
        {
            userId: String,
            username: String,
            profilePicturePath: String,
        }
    ],
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;
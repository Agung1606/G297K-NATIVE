import mongoose from "mongoose";

interface IUserModel {
    firstName: string;
    lastName?: string,
    email: string;
    birthday?: Date;
    username: string;
    password: string;
    profilePicturePath?: string;
    bio?: string;
    followers: string[];
    following: string[];
    postsCount: number;
    tweetsCount: number;
}

const UserSchema = new mongoose.Schema<IUserModel>({
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
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicturePath: String,
    bio: {
        type: String,
        default: "",
    },
    followers: [String],
    following: [String],
    postsCount: Number,
    tweetsCount: Number,
}, {timestamps: true});

const User = mongoose.model<IUserModel>("User", UserSchema);
export default User;
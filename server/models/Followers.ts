import mongoose from "mongoose";

interface IFollowersModel {
    followersUserId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    username: string;
    profilePicturePath: string;
}

const FollowersSchema = new mongoose.Schema<IFollowersModel>({
    followersUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
});

const Followers = mongoose.model<IFollowersModel>("Followers", FollowersSchema);
export default Followers;
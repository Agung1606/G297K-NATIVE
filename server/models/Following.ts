import mongoose from "mongoose";

interface IFollowingModel {
    followingUserId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    username: string;
    profilePicturePath: string;
}

const FollowingSchema = new mongoose.Schema<IFollowingModel>({
    followingUserId: {
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

const Following = mongoose.model<IFollowingModel>("Following", FollowingSchema);
export default Following;
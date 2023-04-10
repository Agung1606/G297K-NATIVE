import mongoose from "mongoose";

interface ITweetModel {
    userId: mongoose.Types.ObjectId;
    username: string;
    postDate: Date;
    userProfilePicturePath: string;
    tweet: string;
    likes: string[];
    comments?: number;
}

const TweetSchema = new mongoose.Schema<ITweetModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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

const Tweet = mongoose.model<ITweetModel>("Tweet", TweetSchema);
export default Tweet;
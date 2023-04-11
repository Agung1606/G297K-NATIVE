import mongoose from "mongoose";

interface ICommentTweetModel {
    userId: mongoose.Types.ObjectId;
    tweetId: mongoose.Types.ObjectId;
    username: string;
    profilePicturePath: string;
    comment: string;
}

const CommentTweetSchema = new mongoose.Schema<ICommentTweetModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tweetId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});

const CommentTweet = mongoose.model<ICommentTweetModel>("CommentTweet", CommentTweetSchema);
export default CommentTweet;
import mongoose from "mongoose";

interface ICommentTweetModel {
    tweetId: mongoose.Types.ObjectId;
    username: string;
    profilePicturePath: string;
    comment: string;
}

const CommentTweetSchema = new mongoose.Schema<ICommentTweetModel>({
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
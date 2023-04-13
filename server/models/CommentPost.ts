import mongoose from "mongoose";

interface ICommentPostModel {
    postId: mongoose.Types.ObjectId;
    username: string;
    profilePicturePath: string;
    comment: string;
}

const CommentPostSchema = new mongoose.Schema<ICommentPostModel>({
    postId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});

const CommentPost = mongoose.model<ICommentPostModel>("CommentPost", CommentPostSchema);
export default CommentPost;
import mongoose from "mongoose";

interface ICommentModel {
    postId: mongoose.Types.ObjectId;
    username: string;
    profilePicturePath: string;
    comment: string;
}

const CommentsSchema = new mongoose.Schema<ICommentModel>({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});

const Comments = mongoose.model<ICommentModel>("Comments", CommentsSchema);
export default Comments;
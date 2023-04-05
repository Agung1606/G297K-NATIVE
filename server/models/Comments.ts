import mongoose from "mongoose";

interface ICommentModel {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    username: string;
    profilePicturePath: string;
    comment: string;
}

const CommentsSchema = new mongoose.Schema<ICommentModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});

const Comments = mongoose.model<ICommentModel>("Comments", CommentsSchema);
export default Comments;
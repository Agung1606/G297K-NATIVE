import mongoose from "mongoose";

interface IPostModel {
    userId: mongoose.Types.ObjectId;
    username: string;
    postDate: Date;
    postPicturePath: string;
    userProfilePicturePath?: string;
    description?: string;
    likes?: [];
    comments?: [];
}

const PostSchema = new mongoose.Schema<IPostModel>({
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
    postPicturePath: String,
    userProfilePicturePath: String,
    description: String,
    likes: [String],
    comments: [String],
}, {timestamps: true});


const Post = mongoose.model<IPostModel>("Post", PostSchema);
export default Post;
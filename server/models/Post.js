import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: 'User',
    },
    username: {
        type: String,
        required: true,
    },
    postDate: Date,
    postPicturePath: String,
    userProfilePicturePath: String,
    description: String,
    likes: [
        {
            userId: String,
            username: String,
            profilePicturePath: String,
        },
    ],
}, {timestamps: true});


const Post = mongoose.model("Post", PostSchema);
export default Post;
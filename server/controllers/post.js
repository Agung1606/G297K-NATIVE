import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

import { StatusCodes } from 'http-status-codes';

// GET: http://192.168.0.106:6002/api/v1/post/explore
export const getExplorePosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                },
            },
            {$sort: {'postDate': -1}},
        ]);

        return res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// PATCH: http://192.168.0.106:6002/api/v1/post/like/:postId
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, username, profilePicturePath } = req.body;

        // find the post in data the db
        const post = await Post.findOne({ _id: postId }).lean();
        if(!post) return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Postingan tidak ditemukan' });

        // check if user has liked it
        const isLiked = post.likes.some((like) => like.userId === userId);
        let updatedLike;

        if(isLiked) {
            updatedLike = post.likes.filter((like) => like.userId !== userId);
        } else {
            updatedLike = [...post.likes, {userId, username, profilePicturePath}]
        }

        // updated 
        const updatedPost = await Post.findByIdAndUpdate(
            post._id,
            { likes: updatedLike },
            { new: true },
        ).lean();

        return res.status(StatusCodes.CREATED).json(updatedPost);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
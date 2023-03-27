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

// PATCH: http://192.168.0.106:6002/api/v1/post/like
export const likePost = async (req, res) => {
    try {
        const { postId, userId, isLiked } = req.body;

        const post = await Post.findById({ _id: postId });

        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        
        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId },
            { likes: post.likes },
            { new: true }
        );
        return res.status(StatusCodes.OK).json(updatedPost);

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
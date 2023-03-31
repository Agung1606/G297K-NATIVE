import { Request, Response } from 'express';
import Post from '../models/Post'

import { StatusCodes } from 'http-status-codes';

// GET: http://192.168.0.106:6002/api/v1/post/explore
export const getExplorePosts = async (req: Request, res: Response) => {
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
            {$unset: ['createdAt', 'updatedAt', '__v']}
        ]);

        return res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
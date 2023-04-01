import Post from "./models/Post"
import User from "./models/User";
import { RegisterType } from "./types/utils";
import { GraphQLError } from "graphql";

import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const resolvers = {
    Query: {
        // QUERY POST
        explorePosts: async () => {
            const posts = await Post.aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'comments'
                    }
                },
                {$sort: {'postDate': -1}},
                {$unset: ['createdAt', 'updatedAt', '__v']}
            ]);
            return posts;
        },
    },
    Mutation: {
        // MUTATION REGISTER
        register: async (_: any, args: RegisterType) => {
            const {
                email,
                firstName,
                lastName,
                birthday,
                pw,
                username
            } = args;

            // check if username exist
            const existUsername = await User.exists({ username: username });
            if(existUsername) {
                throw new GraphQLError('Username sudah digunakan', {
                    extensions: { code: 'BAD_REQUEST' }
                })
            }

            // hashed password
            const hashedPassword = await bcrypt.hash(pw as string, 10);

            const newUser = new User({
                firstName,
                lastName,
                email,
                birthday,
                username,
                password: hashedPassword,
                followers: [],
                following: [],
            });

            await newUser.save();

            const user = await User.findOne({ username: username }).lean();
            if(!user) {
                throw new GraphQLError('User tidak ditemukan', {
                    extensions: { code: '404' }
                })
            }

            // create token
            const secret: string = (process.env.JWT_SECRET_KEY) as string;
            const token = jwt.sign({
                userId: user._id,
            }, secret, { expiresIn: '24d' });

            return {
                userData: user,
                token
            }
        },
    }
}

export default resolvers;
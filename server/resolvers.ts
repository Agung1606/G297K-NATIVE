import Post from "./models/Post"
import User from "./models/User";
import { 
    RegisterArgsType, 
    LoginArgsType, 
    ExplorePostsArgsType, 
    PostArgsType 
} from "./types/utils";
import { GraphQLError } from "graphql";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "./middleware/verifyToken";

import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const resolvers = {
    Query: {
        // QUERY EXPLORE POST
        explorePosts: async (_: any, args: ExplorePostsArgsType) => {
            const { token } = args;
            const verified = await verifyToken(token);
            if(verified){
                const posts = await Post.find({}).lean();
                return posts;
            }
        },
        // QUERY POST
        post: async (_: any, args: PostArgsType) => {
            const { token, _id } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const post = await Post.findById({ _id }).lean();
                return post;
            }
        },
    },
    Mutation: {
        // MUTATION REGISTER
        register: async (_: any, args: RegisterArgsType) => {
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
                    extensions: { code: StatusCodes.BAD_REQUEST }
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
                    extensions: { code: StatusCodes.NOT_FOUND }
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
        // MUTATION LOGIN
        login: async(_: any, args: LoginArgsType) => {
            const {username, pw} = args;

            if(!username || !pw) {
                throw new GraphQLError('Please provide credentials', {
                    extensions: { code: StatusCodes.BAD_REQUEST }
                })
            }
            
            // find req user in the database
            const user = await User.findOne({ username: username }).lean();
            if(!user) {
                throw new GraphQLError('User tidak ditemukan', {
                    extensions: { code: StatusCodes.BAD_REQUEST }
                })
            }
            
            // check password
            const checkPassword = await bcrypt.compare(pw as string, user.password);
            if(!checkPassword) {
                throw new GraphQLError('Password salah', {
                    extensions: { code: StatusCodes.BAD_REQUEST }
                })
            }
            
            // create token
            const secret: string = (process.env.JWT_SECRET_KEY) as string;
            const token = jwt.sign({
                userId: user._id,
            }, secret, { expiresIn: '24d' })

            return {
                userData: user,
                token
            }
        },
    }
}

export default resolvers; 
import Post from "./models/Post"
import User from "./models/User";
import { 
    RegisterArgsType, 
    LoginArgsType, 
    ExplorePostsArgsType, 
    UserPostsArgsType,
    GetPostCommentsArgsType,
    GetUserArgsType,
    GetIsFollowerArgsType,
    GetIsFollowingArgsType,
    FollowUnfollowArgsType
} from "./types/utils";
import { GraphQLError } from "graphql";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "./middleware/verifyToken";

import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Comments from "./models/Comments";
import Followers from "./models/Followers";
import Following from "./models/Following";
import Tweet from "./models/Tweet";

const resolvers = {
    Query: {
        // QUERY TWEETS
        getTweets: async (_: any, args: ExplorePostsArgsType) => {
            const { token } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const tweets = await Tweet.find({}).lean();
                return tweets;
            }
        },
        // QUERY EXPLORE POST
        getExplorePosts: async (_: any, args: ExplorePostsArgsType) => {
            const { token } = args;
            const verified = await verifyToken(token);
            if(verified){
                const posts = await Post.find({}).lean();
                return posts;
            }
        },
        // QUERY USER TWEETS
        getUserTweets: async (_: any, args: UserPostsArgsType) => {
            const { token, userId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const tweets = await Tweet.find({ userId }).lean();
                return tweets;
            }
        },
        // QUERY USER POSTS
        getUserPosts: async (_: any, args: UserPostsArgsType) => {
            const { token, userId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const posts = await Post.find({ userId }).lean();
                return posts;
            }
        },
        // QUERY GET POST COMMENT
        getPostComments: async (_: any, args: GetPostCommentsArgsType) => {
            const {token, postId} = args;
            const verified = await verifyToken(token);
            if(verified) {
                const comments = await Comments.find({ postId }).lean();
                return comments;
            }
        },
        // QUERY GET USER
        getUser: async (_: any, args: GetUserArgsType) => {
            const {token, userId} = args;
            const verified = await verifyToken(token);
            if(verified) {
                const user = await User.findById({ _id: userId }).lean();
                if(!user) {
                    throw new GraphQLError('User tidak ditemukan', {
                        extensions: { code: StatusCodes.NOT_FOUND }
                    })
                }

                return user;
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
                profilePicturePath: 'defaultAvatar.png',
                followers: [],
                following: [],
                postsCount: 0,
                tweetsCount: 0,
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
        // MUTATION FOLLOW UNFOLLOW
        followUnfollow: async (_: any, args: FollowUnfollowArgsType) => {
            const { token, otherId, userId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const otherUser = await User.findOne({ _id: otherId }).lean()
                const user = await User.findOne({ _id: userId }).lean()
                
            }
        },
    }
}

export default resolvers; 
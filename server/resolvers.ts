import Post from "./models/Post"
import User from "./models/User";
import { GraphQLError } from "graphql";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "./middleware/verifyToken";

import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Tweet from "./models/Tweet";
import CommentPost from "./models/CommentPost";
import CommentTweet from "./models/CommentTweet";

import { 
    RegisterArgsType, 
    LoginArgsType, 
    GetTweetsArgsType,
    GetPostsArgsType, 
    GetUserPostsArgsType,
    GetUserTweetsArgsType,
    GetPostArgsType,
    GetCommentPostArgsType,
    GetCommentTweetArgsType,
    GetUserArgsType,
    FollowUnfollowArgsType,
    EditProfileArgsType,
    LikePostArgsType,
    LikeTweetArgsType,
    CommentPostArgsType,
} from "./types/utils";

const resolvers = {
    Query: {
        // QUERY TWEETS
        getTweets: async (_: any, args: GetTweetsArgsType) => {
            const { token } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const tweets = await Tweet.find({}).lean();
                return tweets;
            }
        },
        // QUERY EXPLORE POST
        getPosts: async (_: any, args: GetPostsArgsType) => {
            const { token } = args;
            const verified = await verifyToken(token);
            if(verified){
                const posts = await Post.find({}).lean();
                return posts;
            }
        },
        // QUERY GET POST
        getPost: async (_: any, args: GetPostArgsType) => {
            const { token, postId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const post = await Post.findOne({ _id: postId }).lean();
                if(!post) {
                    throw new GraphQLError('Postingan tidak ditemukan', {
                        extensions: { code: StatusCodes.NOT_FOUND }
                    })
                }
                return post;
            }
        },
        // QUERY USER TWEETS
        getUserTweets: async (_: any, args: GetUserTweetsArgsType) => {
            const { token, userId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const tweets = await Tweet.find({ userId }).lean();
                return tweets;
            }
        },
        // QUERY USER POSTS
        getUserPosts: async (_: any, args: GetUserPostsArgsType) => {
            const { token, userId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const posts = await Post.find({ userId }).lean();
                return posts;
            }
        },
        // QUERY GET POST COMMENT
        getCommentPost: async (_: any, args: GetCommentPostArgsType) => {
            const {token, postId} = args;
            const verified = await verifyToken(token);
            if(verified) {
                const comments = await CommentPost.find({ postId }).lean();
                return comments;
            }
        },
        getCommentTweet: async (_: any, args: GetCommentTweetArgsType) => {
            const {token, tweetId} = args;
            const verified = await verifyToken(token);
            if(verified) {
                const comments = await CommentTweet.find({ tweetId }).lean();
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
        // MUTATION EDIT PROFILE
        editProfile: async (_: any, args: EditProfileArgsType) => {
            const { 
                token, 
                userId, 
                firstName, 
                lastName, 
                username 
            } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const user = await User.findById({ _id: userId }).lean();
                const posts = await Post.find({ userId: userId }).lean();
                
                const userUpdated = await User.findByIdAndUpdate(
                    { _id: user._id },
                    {
                        firstName: firstName,
                        lastName: lastName,
                        username: username
                    },
                    { new: true }
                    );
                    
                    const postsUpdated = await Promise.all(
                        posts.map(post => {
                        return Post.findByIdAndUpdate(
                            { _id: post._id },
                            {
                                username: username
                            },
                            { new: true }
                            );
                        })
                );

                return { userUpdated, postsUpdated };
            }
        },
        // MUTATION FOLLOW UNFOLLOW
        followUnfollow: async (_: any, args: FollowUnfollowArgsType) => {
            const { token, otherId, userId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const otherUser = await User.findOne({ _id: otherId }).lean()
                const user = await User.findOne({ _id: userId }).lean()
    
                if(!otherUser || !user) {
                    throw new GraphQLError('User does not exist', {
                        extensions: { code: StatusCodes.BAD_REQUEST }
                    })
                }
    
                const isFollowing = user.following?.find(id => id === otherId);
    
                if(isFollowing) {
                    user.following = user.following.filter(id => id !== otherId);
                    otherUser.followers = otherUser.followers.filter(id => id !== userId);
                } else {
                    user.following.push(otherId);
                    otherUser.followers.push(userId);
                }
                const otherUpdated = await User.findByIdAndUpdate(
                    otherUser._id,
                    { followers: otherUser.followers },
                    { new: true }
                );
    
                const userUpdated = await User.findByIdAndUpdate(
                    user._id,
                    { following: user.following },
                    { new: true }
                );
    
                return {otherUpdated, userUpdated};
            }
        },
        // MUTATION LIKE POST
        likePost: async (_: any, args: LikePostArgsType) => {
            const { token, postId, userId } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const post = await Post.findOne({ _id: postId }).lean();
                // check if user has liked or not
                const isLiked = post.likes?.find(id => id === userId);
                if(isLiked) {
                    post.likes = post.likes?.filter(id => id !== userId);
                } else {
                    post.likes?.push(userId)
                }
                const updatedPost = await Post.findByIdAndUpdate(
                    post._id,
                    { likes: post.likes },
                    { new: true }
                ).lean();

                return updatedPost;
            }
        },
        likeTweet: async(_: any, args: LikeTweetArgsType) => {
            const {token, tweetId, userId} = args;
            const verified = await verifyToken(token);
            if(verified) {
                const tweet = await Tweet.findOne({ _id: tweetId }).lean();
                // check if user hs liked or not
                const isLiked = tweet.likes?.find(id => id === userId);
                if(isLiked) {
                    tweet.likes = tweet.likes?.filter(id => id !== userId);
                } else {
                    tweet.likes?.push(userId);
                }

                const updatedTweet = await Tweet.findByIdAndUpdate(
                    tweet._id,
                    { likes: tweet.likes },
                    { new: true }
                ).lean();

                return updatedTweet;
            }
        },
        commentPost: async (_: any, args: CommentPostArgsType) => {
            const {
                token,
                userId,
                postId,
                username,
                profilePicturePath,
                comment
            } = args;
            const verified = await verifyToken(token);
            if(verified) {
                const post: typeof Post = await Post.findById({ _id: postId }).lean();

                const newComment = new CommentPost({
                    userId,
                    postId,
                    username,
                    profilePicturePath,
                    comment
                });
                await newComment.save();

                const postUpdated = await Post.findByIdAndUpdate(
                    postId,
                    { comments: post.comments + 1 },
                    { new: true }
                );

                const newComments = await CommentPost.find({ postId }).lean();
                return {
                    postUpdated,
                    newComments
                };
            }
        },
    }
}

export default resolvers; 
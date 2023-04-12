"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("./models/Post"));
const User_1 = __importDefault(require("./models/User"));
const graphql_1 = require("graphql");
const http_status_codes_1 = require("http-status-codes");
const verifyToken_1 = require("./middleware/verifyToken");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Tweet_1 = __importDefault(require("./models/Tweet"));
const CommentPost_1 = __importDefault(require("./models/CommentPost"));
const CommentTweet_1 = __importDefault(require("./models/CommentTweet"));
const resolvers = {
    Query: {
        // QUERY TWEETS
        getTweets: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const tweets = yield Tweet_1.default.find({}).lean();
                return tweets;
            }
        }),
        // QUERY EXPLORE POST
        getPosts: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const posts = yield Post_1.default.find({}).lean();
                return posts;
            }
        }),
        // QUERY GET POST
        getPost: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, postId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const post = yield Post_1.default.findOne({ _id: postId }).lean();
                if (!post) {
                    throw new graphql_1.GraphQLError('Postingan tidak ditemukan', {
                        extensions: { code: http_status_codes_1.StatusCodes.NOT_FOUND }
                    });
                }
                return post;
            }
        }),
        // QUERY USER TWEETS
        getUserTweets: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, userId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const tweets = yield Tweet_1.default.find({ userId }).lean();
                return tweets;
            }
        }),
        // QUERY USER POSTS
        getUserPosts: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, userId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const posts = yield Post_1.default.find({ userId }).lean();
                return posts;
            }
        }),
        // QUERY GET POST COMMENT
        getCommentPost: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, postId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const comments = yield CommentPost_1.default.find({ postId }).lean();
                return comments;
            }
        }),
        getCommentTweet: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, tweetId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const comments = yield CommentTweet_1.default.find({ tweetId }).lean();
                return comments;
            }
        }),
        // QUERY GET USER
        getUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, userId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const user = yield User_1.default.findById({ _id: userId }).lean();
                if (!user) {
                    throw new graphql_1.GraphQLError('User tidak ditemukan', {
                        extensions: { code: http_status_codes_1.StatusCodes.NOT_FOUND }
                    });
                }
                return user;
            }
        }),
    },
    Mutation: {
        // MUTATION REGISTER
        register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, firstName, lastName, birthday, pw, username } = args;
            // check if username exist
            const existUsername = yield User_1.default.exists({ username: username });
            if (existUsername) {
                throw new graphql_1.GraphQLError('Username sudah digunakan', {
                    extensions: { code: http_status_codes_1.StatusCodes.BAD_REQUEST }
                });
            }
            // hashed password
            const hashedPassword = yield bcrypt_1.default.hash(pw, 10);
            const newUser = new User_1.default({
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
            yield newUser.save();
            const user = yield User_1.default.findOne({ username: username }).lean();
            if (!user) {
                throw new graphql_1.GraphQLError('User tidak ditemukan', {
                    extensions: { code: http_status_codes_1.StatusCodes.NOT_FOUND }
                });
            }
            // create token
            const secret = (process.env.JWT_SECRET_KEY);
            const token = jwt.sign({
                userId: user._id,
            }, secret, { expiresIn: '24d' });
            return {
                userData: user,
                token
            };
        }),
        // MUTATION LOGIN
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, pw } = args;
            if (!username || !pw) {
                throw new graphql_1.GraphQLError('Please provide credentials', {
                    extensions: { code: http_status_codes_1.StatusCodes.BAD_REQUEST }
                });
            }
            // find req user in the database
            const user = yield User_1.default.findOne({ username: username }).lean();
            if (!user) {
                throw new graphql_1.GraphQLError('User tidak ditemukan', {
                    extensions: { code: http_status_codes_1.StatusCodes.BAD_REQUEST }
                });
            }
            // check password
            const checkPassword = yield bcrypt_1.default.compare(pw, user.password);
            if (!checkPassword) {
                throw new graphql_1.GraphQLError('Password salah', {
                    extensions: { code: http_status_codes_1.StatusCodes.BAD_REQUEST }
                });
            }
            // create token
            const secret = (process.env.JWT_SECRET_KEY);
            const token = jwt.sign({
                userId: user._id,
            }, secret, { expiresIn: '24d' });
            return {
                userData: user,
                token
            };
        }),
        // MUTATION EDIT PROFILE
        editProfile: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, userId, firstName, lastName, username } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const user = yield User_1.default.findById({ _id: userId }).lean();
                const posts = yield Post_1.default.find({ userId: userId }).lean();
                const userUpdated = yield User_1.default.findByIdAndUpdate({ _id: user._id }, {
                    firstName: firstName,
                    lastName: lastName,
                    username: username
                }, { new: true });
                const postsUpdated = yield Promise.all(posts.map(post => {
                    return Post_1.default.findByIdAndUpdate({ _id: post._id }, {
                        username: username
                    }, { new: true });
                }));
                return { userUpdated, postsUpdated };
            }
        }),
        // MUTATION FOLLOW UNFOLLOW
        followUnfollow: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const { token, otherId, userId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const otherUser = yield User_1.default.findOne({ _id: otherId }).lean();
                const user = yield User_1.default.findOne({ _id: userId }).lean();
                if (!otherUser || !user) {
                    throw new graphql_1.GraphQLError('User does not exist', {
                        extensions: { code: http_status_codes_1.StatusCodes.BAD_REQUEST }
                    });
                }
                const isFollowing = (_a = user.following) === null || _a === void 0 ? void 0 : _a.find(id => id === otherId);
                if (isFollowing) {
                    user.following = user.following.filter(id => id !== otherId);
                    otherUser.followers = otherUser.followers.filter(id => id !== userId);
                }
                else {
                    user.following.push(otherId);
                    otherUser.followers.push(userId);
                }
                const otherUpdated = yield User_1.default.findByIdAndUpdate(otherUser._id, { followers: otherUser.followers }, { new: true });
                const userUpdated = yield User_1.default.findByIdAndUpdate(user._id, { following: user.following }, { new: true });
                return { otherUpdated, userUpdated };
            }
        }),
        // MUTATION LIKE POST
        likePost: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c, _d;
            const { token, postId, userId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const post = yield Post_1.default.findOne({ _id: postId }).lean();
                // check if user has liked or not
                const isLiked = (_b = post.likes) === null || _b === void 0 ? void 0 : _b.find(id => id === userId);
                if (isLiked) {
                    post.likes = (_c = post.likes) === null || _c === void 0 ? void 0 : _c.filter(id => id !== userId);
                }
                else {
                    (_d = post.likes) === null || _d === void 0 ? void 0 : _d.push(userId);
                }
                const updatedPost = yield Post_1.default.findByIdAndUpdate(post._id, { likes: post.likes }, { new: true }).lean();
                return updatedPost;
            }
        }),
        likeTweet: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _e, _f, _g;
            const { token, tweetId, userId } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const tweet = yield Tweet_1.default.findOne({ _id: tweetId }).lean();
                // check if user hs liked or not
                const isLiked = (_e = tweet.likes) === null || _e === void 0 ? void 0 : _e.find(id => id === userId);
                if (isLiked) {
                    tweet.likes = (_f = tweet.likes) === null || _f === void 0 ? void 0 : _f.filter(id => id !== userId);
                }
                else {
                    (_g = tweet.likes) === null || _g === void 0 ? void 0 : _g.push(userId);
                }
                const updatedTweet = yield Tweet_1.default.findByIdAndUpdate(tweet._id, { likes: tweet.likes }, { new: true }).lean();
                return updatedTweet;
            }
        }),
        commentPost: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { token, userId, postId, username, profilePicturePath, comment } = args;
            const verified = yield (0, verifyToken_1.verifyToken)(token);
            if (verified) {
                const post = yield Post_1.default.findById({ _id: postId }).lean();
                const newComment = new CommentPost_1.default({
                    userId,
                    postId,
                    username,
                    profilePicturePath,
                    comment
                });
                yield newComment.save();
                yield Post_1.default.findByIdAndUpdate(postId, { comments: post.comments + 1 }, { new: true });
                const comments = yield CommentPost_1.default.find({ postId }).lean();
                return comments;
            }
        }),
    }
};
exports.default = resolvers;

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
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resolvers = {
    Query: {
        // QUERY POST
        explorePosts: () => __awaiter(void 0, void 0, void 0, function* () {
            const posts = yield Post_1.default.aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'comments'
                    }
                },
                { $sort: { 'postDate': -1 } },
                { $unset: ['createdAt', 'updatedAt', '__v'] }
            ]);
            return posts;
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
                    extensions: { code: 'BAD_REQUEST' }
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
                followers: [],
                following: [],
            });
            yield newUser.save();
            const user = yield User_1.default.findOne({ username: username }).lean();
            if (!user) {
                throw new graphql_1.GraphQLError('User tidak ditemukan', {
                    extensions: { code: '404' }
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
    }
};
exports.default = resolvers;

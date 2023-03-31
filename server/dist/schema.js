"use strict";
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
exports.resolvers = exports.typeDefs = void 0;
const Post_1 = __importDefault(require("./models/Post"));
exports.typeDefs = `#graphql
    type Post {
        userId: String
        username: String
        postDate: String
        postPicturePath: String
        userProfilePicturePath: String
        description: String
    }

    type Query {
        hello: String
        posts: [Post]
        post(userId: String): Post
    }
`;
exports.resolvers = {
    Query: {
        hello: () => 'agung is a good boy',
        posts: () => __awaiter(void 0, void 0, void 0, function* () {
            const posts = yield Post_1.default.find({});
            return posts;
        }),
        post: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const post = yield Post_1.default.findOne({ userId: args.userId });
            return post;
        })
    }
};

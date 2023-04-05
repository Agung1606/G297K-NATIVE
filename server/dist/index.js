"use strict";
// ========= TYPESCRIPT =========
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
// IMPORT
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server_1 = require("@apollo/server");
const errors_1 = require("@apollo/server/errors");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
// import User from './models/User';
// import Post from './models/Post';
// import Tweet from './models/Tweet';
// import Followers from './models/Followers';
// import Following from './models/Following';
// import Comments from './models/Comments';
// import { users, posts, tweets, comments, followers, following } from './data/index';
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config(); // to access environment variable
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new server_1.ApolloServer({
            typeDefs: typeDefs_1.default,
            resolvers: resolvers_1.default,
            formatError: (formattedError, error) => {
                var _a;
                if (formattedError.message.startsWith('Database Error: ')) {
                    return { message: 'Internal Server Error' };
                }
                if (((_a = formattedError.extensions) === null || _a === void 0 ? void 0 : _a.code) ===
                    errors_1.ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
                    return Object.assign(Object.assign({}, formattedError), { message: "Your query doesn't match the schema. Try double-checking it!" });
                }
                return formattedError;
            },
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start();
        yield (0, db_1.connectDB)(); // connect to database first and then run server
        // await User.insertMany(users)
        // await Post.insertMany(posts)
        // await Tweet.insertMany(tweets)
        // await Comments.insertMany(comments)
        // await Followers.insertMany(followers)
        // await Following.insertMany(following)
        const PORT = process.env.PORT || 9002;
        app.use(express_1.default.json());
        app.use((0, helmet_1.default)()); // securing HTTP headers
        app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
        app.use((0, morgan_1.default)('common')); // morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process.
        app.use(body_parser_1.default.json({ limit: '30mb' }));
        app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
        app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'public/assets')));
        app.use('/graphql', (0, cors_1.default)(), (0, express4_1.expressMiddleware)(server));
        yield new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`🚀 Server ready at http://localhost:6002/graphql`);
    });
})();

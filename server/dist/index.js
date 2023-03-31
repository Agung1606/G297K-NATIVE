"use strict";
// // IMPORT
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import path from 'path';
// import bodyParser from 'body-parser';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import multer from 'multer';
// import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import { verifyToken } from './middleware/verifyToken.js'; // middleware to verify the token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // router
// import authRouter from './routes/auth.js';
// import postRouter from './routes/post.js';
// // fake data
// import User from './models/User.js';
// import Post from './models/Post.js';
// import Comment from './models/Comment.js';
// import { users, posts, comments } from './data/index.js'
// // CONFIGURATION
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config(); // to access secret variable
// const app = express();
// // middleware
// app.use(express.json());
// app.use(helmet()); // securing HTTP headers
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// app.use(morgan('common')); // morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process.
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors()); // CORS stands for Cross-Origin Resource Sharing. It allows us to relax the security applied to an API.
// app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
// app.disable('x-powered-by');
// // FILE STORAGE
// const storage = multer.diskStorage({
//     // whenever the user upload file it will be placed in public/assets
//     destination: function(req, file, cb) {
//         cb(null, 'public/assets');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({ storage }); // if we wanna upload file we can use this variable
// // routes
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/post', verifyToken, postRouter);
// /* MONGOOSE AND SERVER SETUP */
// const PORT = process.env.PORT || 9002;
// const hostName = '192.168.0.106';
// mongoose.set('strictQuery', true); // to prevent deprecation waring
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     // insert fake data
//     // User.insertMany(users);
//     // Post.insertMany(posts);
//     // Comment.insertMany(comments);
//     app.listen(PORT, hostName, () => console.log(`Server is listening on port ${PORT}...`));
// }).catch((error) => console.error(`${error} did not found`))
// ========= TYPESCRIPT =========
// IMPORT
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyToken_1 = require("./middleware/verifyToken");
// router import
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
// config
dotenv_1.default.config();
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, morgan_1.default)('common'));
app.use((0, cors_1.default)());
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'public/assets')));
app.disable('X-Powered-By');
// router
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/post', verifyToken_1.verifyToken, post_1.default);
const PORT = process.env.PORT || 9002;
mongoose_1.default.set('strictQuery', true); // to prevent deprecation waring
mongoose_1.default.connect(process.env.MONGO_URI, {
    autoIndex: false
}).then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
}).catch((error) => console.error(`${error} did not found`));

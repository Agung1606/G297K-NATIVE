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
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { verifyToken } from './middleware/verifyToken';
// router import
import authRouter from './routes/auth';
import postRouter from './routes/post';

// config
dotenv.config();
const app: Express = express();
// middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan('common'));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.disable('X-Powered-By')

// router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', verifyToken, postRouter);

const PORT = process.env.PORT || 9002;

mongoose.set('strictQuery', true); // to prevent deprecation waring
mongoose.connect(process.env.MONGO_URI as string, {
    autoIndex: false
}).then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
}).catch((error) => console.error(`${error} did not found`))
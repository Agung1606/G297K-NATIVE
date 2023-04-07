// ========= TYPESCRIPT =========

// IMPORT
import express, { Express } from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { connectDB } from './db';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

// import User from './models/User';
// import Post from './models/Post';
// import Tweet from './models/Tweet';
// import Comments from './models/Comments';
// import { users, posts, tweets, comments } from './data/index';

(async function() {
    dotenv.config(); // to access environment variable
    const app: Express = express();
    
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (formattedError, error) => {
            if(formattedError.message.startsWith('Database Error: ')) {
                return { message: 'Internal Server Error' }
            }

            if(
                formattedError.extensions?.code ===
                ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
            ) {
                return {
                    ...formattedError,
                    message: "Your query doesn't match the schema. Try double-checking it!"
                }
            }

            return formattedError;
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    await server.start();
    await connectDB(); // connect to database first and then run server

    // await User.insertMany(users)
    // await Post.insertMany(posts)
    // await Tweet.insertMany(tweets)
    // await Comments.insertMany(comments)

    const PORT = process.env.PORT || 9002;
    app.use(express.json());
    app.use(helmet()); // securing HTTP headers
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    app.use(morgan('common')); // morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process.
    app.use(bodyParser.json({ limit: '30mb' }));
    app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
    app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        expressMiddleware(server)
    )

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:6002/graphql`);
})();
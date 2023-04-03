"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql
    scalar Date

    type User {
        _id: String
        firstName: String
        lastName: String
        email: String
        birthday: Date
        username: String
        profilePicturePath: String
        bio: String
        followers: [String]
        following: [String]
    }

    type Register {
        userData: User
        token: String
    }

    type Login {
        userData: User
        token: String
    }

    type Post {
        _id: String
        userId: String
        username: String
        postDate: Date
        postPicturePath: String
        userProfilePicturePath: String
        description: String
        likes: [String]
        comments: Int
    }

    type Comments {
        _id: String
        userId: String
        postId: String
        username: String
        profilePicturePath: String
        comment: String
    }

    type Query {
        explorePosts(token: String): [Post]
        post(token: String, _id: String): Post
        getPostComments(token: String, postId: String): [Comments]
    }

    type Mutation {
        register(
            email: String
            firstName: String
            lastName: String
            birthday: Date
            pw: String
            username: String
        ): Register
        login(
            username: String
            pw: String
        ): Login
    }
`;
exports.default = typeDefs;

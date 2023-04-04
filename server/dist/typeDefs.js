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
        followers: Int
        following: Int
    }

    type Followers {
        followersUserId: String
        userId: String
        username: String
        profilePicturePath: String
    }

    type Following {
        followingUserId: String
        userId: String
        username: String
        profilePicturePath: String
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
        getExplorePosts(token: String): [Post]
        getPostComments(token: String, postId: String): [Comments]
        getUser(token: String, userId: String): User
        getUserFollowers(token: String, userId: String): [Followers]
        getUserFollowing(token: String, userId: String): [Following]
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

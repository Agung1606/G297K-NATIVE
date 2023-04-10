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
        postsCount: Int
        tweetsCount: Int
    }

    type Register {
        userData: User
        token: String
    }

    type Login {
        userData: User
        token: String
    }

    type FollowUnfollow {
        otherUpdated: User
        userUpdated: User
    }

    type EditProfile {
        userUpdated: User
        postsUpdated: [Post]
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

    type Tweet {
        _id: String
        userId: String
        username: String
        postDate: Date
        userProfilePicturePath: String
        tweet: String
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
        getTweets(token: String): [Tweet]
        getExplorePosts(token: String): [Post]
        getUserTweets(token: String, userId: String): [Tweet]
        getUserPosts(token: String, userId: String): [Post]
        getPostComments(token: String, postId: String): [Comments]

        getUser(token: String, userId: String): User
        getPost(token: String, postId: String): Post
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
        followUnfollow(
            token: String
            otherId: String
            userId: String
        ): FollowUnfollow
        editProfile(
            token: String
            userId: String
            firstName: String
            lastName: String
            username: String
        ): EditProfile
    }
`;
exports.default = typeDefs;

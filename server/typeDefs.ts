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

    type CommentPost {
        _id: String
        postId: String
        username: String
        profilePicturePath: String
        comment: String
    }

    type CommentTweet {
        _id: String
        tweetId: String
        username: String
        profilePicturePath: String
        comment: String
    }

    type NewCommentPost {
        newComment:  CommentPost
        postUpdated: Post
    }

    type Query {
        getTweets(token: String): [Tweet]
        getPosts(token: String): [Post]
        getUserTweets(token: String, userId: String): [Tweet]
        getUserPosts(token: String, userId: String): [Post]
        getCommentPost(token: String, postId: String): [CommentPost]
        getCommentTweet(token: String, tweetId: String): [CommentTweet]

        getUser(token: String, userId: String): User
        getPost(token: String, postId: String): Post
        getTweet(token: String, tweetId: String): Tweet
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
        editProfile(
            token: String
            userId: String
            firstName: String
            lastName: String
            username: String
        ): EditProfile
        followUnfollow(
            token: String
            otherId: String
            userId: String
        ): FollowUnfollow
        likePost(
            token: String
            postId: String
            userId: String
        ): Post
        likeTweet(
            token: String
            tweetId: String
            userId: String
        ): Tweet
        commentPost(
            token: String
            postId: String
            username: String
            profilePicturePath: String
            comment: String
        ): NewCommentPost
    }
`

export default typeDefs;
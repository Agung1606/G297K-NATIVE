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
        postsCount: Int
        tweetsCount: Int
    }

    type Followers {
        _id: String
        followersUserId: String
        userId: String
        username: String
        profilePicturePath: String
    }

    type Following {
        _id: String
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
        getUserFollowers(token: String, userId: String): [Followers]
        getUserFollowing(token: String, userId: String): [Following]

        getIsFollower(token: String, followersUserId: String, userId: String): Followers
        getIsFollowing(token: String, followingUserId: String, userId: String): Following
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
`

export default typeDefs;
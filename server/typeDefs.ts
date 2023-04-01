const typeDefs = `#graphql
    scalar Date

    type User {
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

    type comments {
        postId: String
        username: String
        profilePicturePath: String
        comment: String
    }

    type Post {
        userId: String
        username: String
        postDate: Date
        postPicturePath: String
        userProfilePicturePath: String
        description: String
        likes: [String]
        comments: [comments]
    }

    type Query {
        explorePosts: [Post]
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
    }
`

export default typeDefs;
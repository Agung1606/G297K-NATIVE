import Post from "./models/Post"

export const typeDefs = `#graphql
    type Post {
        userId: String
        username: String
        postDate: String
        postPicturePath: String
        userProfilePicturePath: String
        description: String
    }

    type Query {
        hello: String
        posts: [Post]
        post(userId: String): Post
    }
`
export const resolvers = {
    Query: {
        hello: () => 'agung is a good boy',
        posts: async () => {
            const posts = await Post.find({});
            return posts;
        },
        post: async (parent: typeof Post, args: any) => {
            const post = await Post.findOne({ userId: args.userId });
            return post;
        }
    }
}
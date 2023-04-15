// mutation
export type RegisterArgsType = {
    email: string
    firstName: string
    lastName?: string
    birthday: Date
    pw: string
    username: string
}

export type LoginArgsType = {
    username: string
    pw: string
}

export type FollowUnfollowArgsType = {
    token: string
    otherId: string
    userId: string
}

export type EditProfileArgsType = {
    token: string
    userId: string
    firstName: string
    lastName: string
    username: string
}

export type LikePostArgsType = {
    token: string
    postId: string
    userId: string
}

export type LikeTweetArgsType = {
    token: string
    tweetId: string
    userId: string
}

export type CommentPostArgsType = {
    token: string
    postId: string
    username: string
    profilePicturePath: string
    comment: string
}

export type CommentTweetArgsType = {
    token: string
    tweetId: string
    username: string
    profilePicturePath: string
    comment: string
}
// mutation

// query
export type GetTweetsArgsType = {
    token: string
}

export type GetPostsArgsType = {
    token: string
}

export type GetUserPostsArgsType = {
    token: string
    userId: string
}

export type GetUserTweetsArgsType = {
    token: string
    userId: string
}

export type GetPostArgsType = {
    token: string
    postId: string
}

export type GetTweetArgsType = {
    token: string
    tweetId: string
}

export type GetCommentPostArgsType = {
    token: string
    postId: string
}

export type GetCommentTweetArgsType = {
    token: string
    tweetId: string
}

export type GetUserArgsType = {
    token: string
    userId: string
}
// query

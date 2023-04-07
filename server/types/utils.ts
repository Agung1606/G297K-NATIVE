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

export type ExplorePostsArgsType = {
    token: string
}

export type UserPostsArgsType = {
    token: string
    userId: string
}

export type GetPostCommentsArgsType = {
    token: string
    postId: string
}

export type GetUserArgsType = {
    token: string
    userId: string
}

export type GetIsFollowerArgsType = {
    token: string
    followersUserId: string
    userId: string
}

export type GetIsFollowingArgsType = {
    token: string
    followingUserId: string
    userId: string
}
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

export type GetPostCommentsArgsType = {
    token: string
    postId: string
}

export type GetUserArgsType = {
    token: string
    userId: string
}
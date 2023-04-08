import User from "../models/User"

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
// mutation

// query
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
// query

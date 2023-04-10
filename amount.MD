<!-- post -->
{
    _id: string
    userId: string
    username: string
    postDate: date
    postPicturePath: string
    userProfilePicutrePath: string
    description: string
    isLoggedInUserLiked: boolean
    amountOfLikes: number
    amountOfComments: number
}

<!-- likes -->
{
    _id: string
    postId: string
    username: string
    profiePicturePath: string
}
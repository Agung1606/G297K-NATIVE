export type RegisterType = {
    email: String
    firstName: String
    lastName?: String
    birthday: Date
    pw: String
    username: String
}

export type LoginType = {
    username: String
    pw: String
}
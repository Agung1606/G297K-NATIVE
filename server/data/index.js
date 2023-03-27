import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

const postIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const users = [
    // Jinbei
    {
        _id: userIds[0],
        firstName: "Jinbei",
        lastName: "",
        email: "jinbei297@gmail.com",
        birthday: "",
        username: "jinbei_",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p1.jpg",
        bio: '',
        followers: {},
        following: {},
    },
    // Luffy
    {
        _id: userIds[1],
        firstName: "Monkey D.",
        lastName: "Luffy",
        email: "luffy297@gmail.com",
        birthday: "",
        username: "king_of_pirate",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p2.jpg",
        bio: '',
        followers: {},
        following: {},
    },
    // Zoro
    {
        _id: userIds[2],
        firstName: "Roronoa",
        lastName: "Zoro",
        email: "zoro297@gmail.com",
        birthday: "",
        username: "rrnoazoro_",
        password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        profilePicturePath: "p3.jpg",
        bio: '',
        followers: {},
        following: {},
    },
    // Sanji
    {
        _id: userIds[3],
        firstName: "Vinsmoke",
        lastName: "Sanji",
        email: "sanji297@gmail.com",
        birthday: "",
        username: "vnsmkSanji",
        password: "d$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p4.jpg",
        bio: '',
        followers: {},
        following: {},
    },
    // Usop
    {
        _id: userIds[4],
        firstName: "Sogeking",
        lastName: "Usopp",
        email: "usop297@gmail.com",
        birthday: "",
        username: "_usoppp",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p5.jpg",
        bio: '',
        followers: {},
        following: {},
    },
    // Chopper
    {
        _id: userIds[5],
        firstName: "Tony",
        lastName: "Chopper",
        email: "chopper297@gmail.com",
        birthday: "",
        username: "tonytony",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p6.png",
        bio: '',
        followers: {},
        following: {},
    },
    // Nami
    {
        _id: userIds[6],
        firstName: "Nami",
        lastName: "",
        email: "nami297@gmail.com",
        birthday: "",
        username: "thiefCat_",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p7.jpg",
        bio: '',
        followers: {},
        following: {},
    },
    // Robin
    {
        _id: userIds[7],
        firstName: "Robin",
        lastName: "",
        email: "robin297@gmail.com",
        birthday: "",
        username: "robinnn12_",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p8.jpeg",
        bio: '',
        followers: {},
        following: {},
    },
    // Brook
    {
        _id: userIds[8],
        firstName: "Brook",
        lastName: "",
        email: "brook297@gmail.com",
        birthday: "",
        username: "brook32._",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p9.jpg",
        bio: '',
        followers: {},
        following: {},
    },
    // Franky
    {
        _id: userIds[9],
        firstName: "Franky",
        lastName: "",
        email: "franky297@gmail.com",
        birthday: "",
        username: "franks297",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        profilePicturePath: "p10.jpg",
        bio: '',
        followers: {},
        following: {},
    },
];

export const posts = [
    // Jinbei
    {
        _id: postIds[0],
        userId: userIds[0],
        username: "jinbei_",
        postDate: new Date( Date.now() - 1000 * 60),
        postPicturePath: "post1.jpg",
        userProfilePicturePath: "p1.jpg",
        description: "Hello",
        likes: new Map(),
    },
    // Luffy
    {
        _id: postIds[1],
        userId: userIds[1],
        username: "king_of_pirate",
        postDate: new Date( Date.now() - 2000 * 60),
        postPicturePath: "post2.jpg",
        userProfilePicturePath: "p2.jpg",
        description: "I will be the king of pirates!!!",
        likes: new Map(),
    },
    // Zoro
    {
        _id: postIds[2],
        userId: userIds[2],
        username: "rrnoazoro_",
        postDate: new Date( Date.now() - 3000 * 60),
        postPicturePath: "post3.jpg",
        userProfilePicturePath: "p3.jpg",
        description: "ENMA",
        likes: new Map(),
    },
    // Sanji
    {
        _id: postIds[3],
        userId: userIds[3],
        username: "vnsmkSanji",
        postDate: new Date( Date.now() - 4000 * 60),
        postPicturePath: "post4.jpg",
        userProfilePicturePath: "p4.jpg",
        description: "",
        likes: new Map(),
    },
    // Usopp
    {
        _id: postIds[4],
        userId: userIds[4],
        username: "_usoppp",
        postDate: new Date( Date.now() - 5000 * 60),
        postPicturePath: "post5.jpeg",
        userProfilePicturePath: "p5.jpg",
        description: "I am usopp!!!",
        likes: new Map(),
    },
    // chopper
    {
        _id: postIds[5],
        userId: userIds[5],
        username: "tonytony",
        postDate: new Date( Date.now() - 6000 * 60),
        postPicturePath: "post6.jpg",
        userProfilePicturePath: "p6.png",
        description: "No Caption",
        likes: new Map(),
    },
    // nami
    {
        _id: postIds[6],
        userId: userIds[6],
        username: "thiefCat_",
        postDate: new Date( Date.now() - 7000 * 60),
        postPicturePath: "post7.jpg",
        userProfilePicturePath: "p7.jpg",
        description: "Beautiful woman",
        likes: new Map(),
    },
    // robin
    {
        _id: postIds[7],
        userId: userIds[7],
        username: "robinnn12_",
        postDate: new Date( Date.now() - 8000 * 60),
        postPicturePath: "post8.jpg",
        userProfilePicturePath: "p8.jpeg",
        description: "Beautiful woman",
        likes: new Map(),
    },
    // brook
    {
        _id: postIds[8],
        userId: userIds[8],
        username: "brook32._",
        postDate: new Date( Date.now() - 9000 * 60),
        postPicturePath: "post9.jpg",
        userProfilePicturePath: "p9.jpg",
        description: "Hello I am brook",
        likes: new Map(),
    },
    // Franky
    {
        _id: postIds[9],
        userId: userIds[9],
        username: "franks297",
        postDate: new Date( Date.now() - 10000 * 60),
        postPicturePath: "post10.jpg",
        userProfilePicturePath: "p10.jpg",
        description: "Heyy",
        likes: new Map(),
    },
];

export const comments = [
    {
        postId: postIds[0],
        username: 'king_of_pirate',
        profilePicturePath: 'p2.jpg',
        comment: 'you look like a fishman',
        reply: [
            {
                username: 'vnsmkSanji',
                profilePicturePath: 'p4.jpg',
                comment: 'test comment balasan',
            }
        ],
    },
    {
        postId: postIds[0],
        username: 'vnsmkSanji',
        profilePicturePath: 'p4.jpg',
        comment: 'test comment, i am sanji',
        reply: [],
    },
    {
        postId: postIds[0],
        username: 'king_of_pirate',
        profilePicturePath: 'p2.jpg',
        comment: 'test 123',
        reply: [],
    },
    {
        postId: postIds[0],
        username: 'rrnoazoro_',
        profilePicturePath: 'p3.jpg',
        comment: 'test TEest test test',
        reply: [],
    },
    {
        postId: postIds[0],
        username: 'king_of_pirate',
        profilePicturePath: 'p2.jpg',
        comment: 'test comment 123',
        reply: [],
    },
];
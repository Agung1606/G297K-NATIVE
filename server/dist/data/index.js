"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweets = exports.posts = exports.users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
const postIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
const tweetIds = [
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
    new mongoose_1.default.Types.ObjectId(),
];
exports.users = [
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 1,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
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
        followers: [],
        following: [],
        postsCount: 1,
        tweetsCount: 0,
    },
];
// export const followers = [
//     {
//         followersUserId: userIds[0],
//         userId: userIds[1],
//         username: 'king_of_pirate',
//         profilePicturePath: 'p2.jpg'
//     },
//     {
//         followersUserId: userIds[0],
//         userId: userIds[9],
//         username: 'franks297',
//         profilePicturePath: 'p10.jpg'
//     },
// ];
// export const following = [
//     {
//         followingUserId: userIds[1],
//         userId: userIds[0],
//         username: 'jinbei_',
//         profilePicturePath: 'p1.jpg',
//     },
//     {
//         followingUserId: userIds[9],
//         userId: userIds[0],
//         username: 'jinbei_',
//         profilePicturePath: 'p1.jpg',
//     },
// ];
exports.posts = [
    // Jinbei
    {
        _id: postIds[0],
        userId: userIds[0],
        username: "jinbei_",
        postDate: new Date(Date.now() - 1000 * 60),
        postPicturePath: "post1.jpg",
        userProfilePicturePath: "p1.jpg",
        description: "Hello",
        likes: [
            userIds[1],
            userIds[2],
            userIds[3],
            userIds[4],
            userIds[5]
        ],
        comments: 1,
    },
    // Luffy
    {
        _id: postIds[1],
        userId: userIds[1],
        username: "king_of_pirate",
        postDate: new Date(Date.now() - 2000 * 60),
        postPicturePath: "post2.jpg",
        userProfilePicturePath: "p2.jpg",
        description: "I will be the king of pirates!!!",
        likes: [],
        comments: 0,
    },
    // Zoro
    {
        _id: postIds[2],
        userId: userIds[2],
        username: "rrnoazoro_",
        postDate: new Date(Date.now() - 3000 * 60),
        postPicturePath: "post3.jpg",
        userProfilePicturePath: "p3.jpg",
        description: "ENMA",
        likes: [],
        comments: 0,
    },
    // Sanji
    {
        _id: postIds[3],
        userId: userIds[3],
        username: "vnsmkSanji",
        postDate: new Date(Date.now() - 4000 * 60),
        postPicturePath: "post4.jpg",
        userProfilePicturePath: "p4.jpg",
        description: "",
        likes: [],
        comments: 0,
    },
    // Usopp
    {
        _id: postIds[4],
        userId: userIds[4],
        username: "_usoppp",
        postDate: new Date(Date.now() - 5000 * 60),
        postPicturePath: "post5.jpeg",
        userProfilePicturePath: "p5.jpg",
        description: "I am usopp!!!",
        likes: [],
        comments: 0,
    },
    // chopper
    {
        _id: postIds[5],
        userId: userIds[5],
        username: "tonytony",
        postDate: new Date(Date.now() - 6000 * 60),
        postPicturePath: "post6.jpg",
        userProfilePicturePath: "p6.png",
        description: "No Caption",
        likes: [],
        comments: 0,
    },
    // nami
    {
        _id: postIds[6],
        userId: userIds[6],
        username: "thiefCat_",
        postDate: new Date(Date.now() - 7000 * 60),
        postPicturePath: "post7.jpg",
        userProfilePicturePath: "p7.jpg",
        description: "Beautiful woman",
        likes: [],
        comments: 0,
    },
    // robin
    {
        _id: postIds[7],
        userId: userIds[7],
        username: "robinnn12_",
        postDate: new Date(Date.now() - 8000 * 60),
        postPicturePath: "post8.jpg",
        userProfilePicturePath: "p8.jpeg",
        description: "Beautiful woman",
        likes: [],
        comments: 0,
    },
    // brook
    {
        _id: postIds[8],
        userId: userIds[8],
        username: "brook32._",
        postDate: new Date(Date.now() - 9000 * 60),
        postPicturePath: "post9.jpg",
        userProfilePicturePath: "p9.jpg",
        description: "Hello I am brook",
        likes: [],
        comments: 0,
    },
    // Franky
    {
        _id: postIds[9],
        userId: userIds[9],
        username: "franks297",
        postDate: new Date(Date.now() - 10000 * 60),
        postPicturePath: "post10.jpg",
        userProfilePicturePath: "p10.jpg",
        description: "Heyy",
        likes: [],
        comments: 0,
    },
];
exports.tweets = [
    {
        _id: tweetIds[3],
        userId: userIds[3],
        username: "vnsmkSanji",
        postDate: new Date(Date.now() - 4000 * 60),
        userProfilePicturePath: "p4.jpg",
        tweet: "Sejarah Indonesia meliputi suatu rentang waktu yang sangat panjang yang dimulai sejak zaman prasejarah berdasarkan penemuan 'Manusia Jawa' yang berusia 1,7 juta tahun yang lalu. Periode sejarah Indonesia dapat dibagi menjadi lima era: Era Prakolonial, munculnya kerajaan-kerajaan Hindu-Buddha dan Islam di Jawa, Sumatra, dan Kalimantan yang terutama mengandalkan perdagangan; Era Kolonial, masuknya orang-orang Eropa (terutama Belanda, Portugis, dan Spanyol) yang menginginkan rempah-rempah mengakibatkan penjajahan oleh Belanda selama sekitar 3,5 abad antara awal abad ke-17 hingga pertengahan abad ke-20; Era Kemerdekaan Awal, pasca-Proklamasi Kemerdekaan Indonesia (1945) sampai jatuhnya Soekarno (1966); Era Orde Baru, 32 tahun masa pemerintahan Soeharto (1966–1998); serta Orde Reformasi yang berlangsung sampai sekarang.",
        likes: [],
        comments: 1,
    },
    {
        _id: tweetIds[1],
        userId: userIds[1],
        username: "jinbei_",
        postDate: new Date(Date.now() - 2000 * 60),
        userProfilePicturePath: "p1.jpg",
        tweet: `Ilmu pengetahuan alam (akronim: IPA) atau kerap diperpendek sebagai ilmu alam (serapan dari bahasa Arab: علوم العالم) adalah istilah yang digunakan yang merujuk pada rumpun ilmu di mana objeknya adalah benda-benda alam dengan hukum-hukum yang pasti dan umum, berlaku kapan pun dan di mana pun.[1] Orang yang menekuni bidang ilmu pengetahuan alam disebut sebagai Saintis. Sains (science) diambil dari kata latin scientia yang arti harfiahnya adalah pengetahuan. Sund dan Trowbribge merumuskan bahwa Sains merupakan kumpulan pengetahuan dan proses. Sedangkan Kuslan Stone menyebutkan bahwa Sains adalah kumpulan pengetahuan dan cara-cara untuk mendapatkan dan mempergunakan pengetahuan itu. Sains merupakan produk dan proses yang tidak dapat dipisahkan. "Real Science is both product and process, inseparably Joint" (Agus. S. 2003: 11) Sains sebagai proses merupakan langkah-langkah yang ditempuh para ilmuwan untuk melakukan penyelidikan dalam rangka mencari penjelasan tentang gejala-gejala alam. Langkah tersebut adalah merumuskan masalah, merumuskan hipotesis, merancang eksperimen, mengumpulkan data, menganalisis dan akhimya menyimpulkan. Dari sini tampak bahwa karakteristik yang mendasar dari Sains ialah kuantifikasi artinya gejala alam dapat berbentuk kuantitas. Ilmu alam mempelajari aspek-aspek fisik & nonmanusia tentang Bumi dan alam sekitarnya. Ilmu-ilmu alam membentuk landasan bagi ilmu terapan, yang keduanya dibedakan dari ilmu sosial, humaniora, teologi, dan seni.`,
        likes: [],
        comments: 0,
    },
];

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// models
const User_1 = __importDefault(require("../models/User"));
// POST: http://localhost:6002/api/v1/auth/register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // unpack the request body
        const { email, firstName, lastName, birthday, pw, username } = req.body;
        // check if username exist
        const existUsername = yield User_1.default.exists({ username: username });
        if (existUsername)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Username sudah digunakan' });
        // hashed password
        const hashedPassword = yield bcrypt_1.default.hash(pw, 10);
        const newUser = new User_1.default({
            firstName,
            lastName,
            email,
            birthday,
            username,
            password: hashedPassword,
            followers: {},
            following: {},
        });
        yield newUser.save();
        const user = yield User_1.default.findOne({ username: username }).lean();
        if (!user)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'User tidak ditemukan' });
        // create token
        const secret = (process.env.JWT_SECRET_KEY);
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, secret, { expiresIn: '24d' });
        const { password } = user, rest = __rest(user, ["password"]);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            userData: rest,
            token
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.register = register;
// POST: http://localhost:6002/api/v1/auth/login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // unpack the request body
        const { username, pw } = req.body;
        if (!username || !pw)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Please provide credentials' });
        // find req user in the database
        const user = yield User_1.default.findOne({ username: username }).lean();
        if (!user)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'User tidak ditemukan' });
        // check password
        const checkPassword = yield bcrypt_1.default.compare(pw, user.password);
        if (!checkPassword)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Password salah' });
        // create token
        const secret = (process.env.JWT_SECRET_KEY);
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, secret, { expiresIn: '24d' });
        // left the password
        const { password } = user, rest = __rest(user, ["password"]);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: 'Login berhasil',
            userData: rest,
            token
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.login = login;

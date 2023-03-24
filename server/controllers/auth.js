import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// models
import User from '../models/User.js';

// POST: http://localhost:6002/api/v1/auth/register
export const register = async (req, res) => {
    try {
        // unpack the request body
        const {
            email,
            firstName,
            lastName,
            birthday,
            pw,
            username
        } = req.body;

        // check if username exist
        const existUsername = await User.exists({ username: username });
        if(existUsername) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Username sudah digunakan' });

        // hashed password
        const hashedPassword = await bcrypt.hash(pw, 10);

        const newUser = new User({
            firstName,
            lastName: lastName || '',
            email,
            birthday,
            username,
            password: hashedPassword,
            followers: [],
            following: [],
        });

        await newUser.save();

        const user = await User.findOne({ username: username }).lean();
        if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User tidak ditemukan' });

        
        // create token
        const token = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '24d' });
        
        const {password, ...rest} = user;
        return res.status(StatusCodes.CREATED).json({
            userData: rest,
            token
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }    
};
    
// POST: http://localhost:6002/api/v1/auth/login
export const login = async (req, res) => {
    try {
        // unpack the request body
        const {username, pw} = req.body;

        if(!username || !pw) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide credentials' });

        // find req user in the database
        const user = await User.findOne({ username: username }).lean();
        if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User tidak ditemukan' });

        // check password
        const checkPassword = await bcrypt.compare(pw, user.password);
        if(!checkPassword) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Password salah' });

        // create token
        const token = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '24d' });

        // left the password
        const { password, ...rest } = user;

        return res.status(StatusCodes.OK).json({
            msg: 'Login berhasil',
            userData: rest,
            token
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};


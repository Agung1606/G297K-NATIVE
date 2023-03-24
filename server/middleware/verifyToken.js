import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized'});
    }

    const token = authHeader.split(' ')[1]; // only take the token without bearer keyword
    const verifed = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = verifed;
    next();
};
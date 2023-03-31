import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

interface RequestUser extends Request {
    user?: JwtPayload
}

export const verifyToken = async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1]; // just take the token
    if(!token) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized user' });

    const secret: string = (process.env.JWT_SECRET_KEY as string)
    const verifed = jwt.verify(token, secret) as JwtPayload;
    req.user = verifed;
    
    next();
};
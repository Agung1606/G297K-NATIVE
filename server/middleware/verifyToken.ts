import { StatusCodes } from "http-status-codes";
import { GraphQLError } from "graphql";
import * as jwt from 'jsonwebtoken';

export const verifyToken = async (token: string) => {
    if(!token) {
        throw new GraphQLError('Unauthorized user', {
            extensions: { code: StatusCodes.UNAUTHORIZED }
        })
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    return verified;
};
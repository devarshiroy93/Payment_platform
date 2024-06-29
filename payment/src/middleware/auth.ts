import { NextFunction, Request, Response } from "express";
import { verify , JwtPayload} from 'jsonwebtoken'

export const auth = async (req: Request, res: Response, next: NextFunction) => {


   
    const tokenString = req.headers['authorization'] as string;;
    console.log('auth' , tokenString);
    if (!tokenString) {
        console.log('INVALID REQUEST');
        return res.status(400).send({
            isSuccess: false,
            token: null
        })
    }
    const token = tokenString?.split(' ')[1] || '';

    if (!token) {
        console.log('INVALID REQUEST.NO TOKEN FOUND');
        return res.status(400).send({
            isSuccess: false,
            token: null
        })
    }
    console.log('VERIFY TOKEN');

    const user = await verify(token, 'my-secret');

    req.user = user;
    console.log(user);
    next()

}
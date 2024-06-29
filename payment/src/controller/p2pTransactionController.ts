import { Request, Response } from "express";
import { p2pTransaction } from "../services/p2pTransactonservice";

export const p2pTransactionController = async (req: Request, res: Response) => {

    const {amount, userId} = req.body;
    const authToken = req.headers['authorization'] || '';
    const user = req.user;
    const service = await p2pTransaction({amount ,  fromUser : user , toUserId : userId , authToken});
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message,
        data: service.data
    })
}
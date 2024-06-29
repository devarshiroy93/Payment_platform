import { Request, Response } from "express"
import { fetchOnRampTransactions, onRampTransaction } from "../services/onRampTransaction";

export const startOnRampTransactionsController = async (req: Request, res: Response) => {

    const { amount, provider } = req.body;
    const userId = req.user.id;
    const service = await onRampTransaction(amount, provider , userId);
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message,
        data: service.data
    })
}

export const getOnRampTransactionsController = async (req: Request, res: Response) => {

    //getting the userId from token
    const userId = req.user.id;
    const service = await fetchOnRampTransactions(userId);
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message,
        data: service.data
    })
}
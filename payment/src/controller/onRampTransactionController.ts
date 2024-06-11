import { Request, Response } from "express"
import { fetchOnRampTransactions, onRampTransaction } from "../services/onRampTransaction";

export const startOnRampTransactionsController = async (req: Request, res: Response) => {

    const { amount, provider } = req.body;
    const service = await onRampTransaction(amount, provider)
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message
    })
}

export const getOnRampTransactionsController = async (req: Request, res: Response) => {

    //get the userId from token
    const userId = 33;
    const service = await fetchOnRampTransactions(userId);
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message,
        data: service.data
    })
}
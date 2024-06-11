import { Request, Response } from "express"
import { webHookServcice } from "../services/webHook"


export const webHookController = async (req: Request, res: Response) => {

    const { token, userId, amount } = req.body
    const service = await webHookServcice({ amount, token, userId });

    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message
    })
}
import { Request, Response } from "express"
import { getBalanceByUserIdService } from "../services/balance"

export const getBalanceController = async (req : Request , res : Response)=>{

    const service = await  getBalanceByUserIdService(Number(req.query.userId))
    return res.status(200).send({
        isSuccess: true,
        data : service.data
    })
}
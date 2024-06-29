import { Request, Response } from "express"
import { initialiseBalanceForNewUser as initBalService } from "../services/initialiseBalanceForNewUser"

export const initialiseBalanceForNewUser = async (req : Request , res : Response)=>{

    const service = await  initBalService(Number(req.body.userId))
    return res.status(200).send({
        isSuccess: true,
        data : service.data
    })
}
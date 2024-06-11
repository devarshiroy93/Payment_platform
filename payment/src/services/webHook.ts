import { findBalanceByUserId } from "../model/balance"
import { bankWebHookModel } from "../model/bankWebhookmodel";

export const webHookServcice = async (payload: { token: string, userId: number, amount: number } )=>{

   const webHookRes = await  bankWebHookModel(payload);
   return webHookRes
}
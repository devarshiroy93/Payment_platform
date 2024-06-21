import { findBalanceByUserId } from "../model/balance"
import { bankWebHookModel } from "../model/bankWebhookmodel";

export const webHookServcice = async (payload: { token: string, amount: number } )=>{

   const webHookRes = await  bankWebHookModel(payload);
   return webHookRes
}
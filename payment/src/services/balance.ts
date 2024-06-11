import { findBalanceByUserId } from "../model/balance";

export const getBalanceByUserIdService = async ( userId : number)=>{

   const balance = await  findBalanceByUserId(userId);
   return balance
}
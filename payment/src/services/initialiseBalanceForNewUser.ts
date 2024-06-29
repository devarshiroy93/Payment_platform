import { initialiseBalanceForNewUser as  initialiseBalanceForNewUserModel} from "../model/balance";

export const initialiseBalanceForNewUser = async ( userId : number)=>{

   const balance = await  initialiseBalanceForNewUserModel(userId);
   return balance
}
import { getOnRampTransactions, startOnRampTransaction } from "../model/onRampTransaction";

export const onRampTransaction = async (amount: number, provider: string , userId : number) => {

    const onRampTxn = await startOnRampTransaction({ amount, provider , userId });

    return onRampTxn
}

export const fetchOnRampTransactions = async (userId: number) => {

    console.log('userID' , userId);
    const transactions = await getOnRampTransactions(userId);
    return transactions;

}
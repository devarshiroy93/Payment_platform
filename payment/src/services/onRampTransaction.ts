import { getOnRampTransactions, startOnRampTransaction } from "../model/onRampTransaction";

export const onRampTransaction = async (amount: number, provider: string) => {

    const onRampTxn = await startOnRampTransaction({ amount, provider });

    return onRampTxn
}

export const fetchOnRampTransactions = async (userId: number) => {

    console.log('userID' , userId);
    const transactions = await getOnRampTransactions(userId);
    return transactions;

}
import { createP2pTransaction } from "../model/p2pTransactionmodel"


type User = {
    id: number,
    firstName: string,
    lastName: string
}
export type p2pTransactionRequest = {

    amount: number,
    fromUser: User,
    toUser: User
}

type p2pTransactionServiceRequest = {
    amount: number,
    fromUser: User,
    toUserId: number,
    authToken: string
}

export const p2pTransaction = async ({ amount, fromUser, toUserId, authToken }: p2pTransactionServiceRequest) => {

    const toUserRes = await fetchToUserDetails(toUserId, authToken.split(' ')[1]);
    console.log('authToken', authToken);
    console.log('toUser', toUserRes);
    if (!toUserRes.isSuccess) {
        return {
            isError: true,
            message: 'fetching user id failed',
            data: null
        }
    }
    const p2pTxn = await createP2pTransaction({ amount : Number(amount), fromUser, toUser: toUserRes.body })

    return p2pTxn
}

const fetchToUserDetails = async (userId: number, authToken: string) => {
    const res = await fetch(`${process.env.PLATFORM_AUTH_URL}api/v1/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
    });
    return res.json();
}
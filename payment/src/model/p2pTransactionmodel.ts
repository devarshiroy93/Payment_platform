import { PrismaClient } from '@prisma/client'
import { p2pTransactionRequest } from '../services/p2pTransactonservice';
const prisma = new PrismaClient();

export const createP2pTransaction = async (data: p2pTransactionRequest) => {
    const { amount, toUser, fromUser } = data;
    try {


        await prisma.$transaction(async (tx) => {
            

            //decrease senders balance
            await prisma.balances.update({
                where: { userId: fromUser.id },
                data: { amount: { decrement: amount } }
            });

            //increase receivers balance
            await prisma.balances.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } }
            })

            //add entry in p2ptransactions table

            await prisma.p2pTransfers.create({
                data: {
                    amount,
                    fromUserId: fromUser.id,
                    fromUserName: `${fromUser.firstName} ${fromUser.lastName}`,
                    timeStamp: new Date(),
                    toUserId: toUser.id,
                    toUserName: `${toUser.firstName} ${toUser.lastName}`
                }
            });
        })

        return {
            isError: false,
            message: 'Transactions successfull',
            data: null
        }
    } catch (err) {
        console.log('ERROR IN P2P');
        return {
            isError: true,
            message: 'Transactions failed',
            data: null
        }
    }

};


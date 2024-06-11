import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const bankWebHookModel = async (payload: { token: string, userId: number, amount: number }) => {


    const { token, userId, amount } = payload;
    try {
        const transaction = await prisma.onRampTransactions.findFirst({
            where: {
                token
            }
        });
        if (!!transaction && transaction.status === 'Processing') {
            await prisma.$transaction([
                prisma.balances.updateMany({
                    where: {
                        userId: Number(userId)
                    },
                    data: {
                        amount: {
                            // You can also get this from your DB
                            increment: Number(amount)
                        }
                    }
                }),
                prisma.onRampTransactions.updateMany({
                    where: {
                        token: token
                    },
                    data: {
                        status: "Success",
                    }
                })
            ]);
        } else {
            return {
                isError : true ,
                message : 'Transaction process failed'
            }
        }


        return {
            isError : false ,
            message : 'Transaction processed'
        }
    } catch (e : unknown) {
        console.error(e);
        throw new Error("Webhook failed");
    }

}
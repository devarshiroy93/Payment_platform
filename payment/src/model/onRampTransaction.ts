import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const startOnRampTransaction = async (data: { amount: number, provider: string }) => {

    const { amount, provider } = data;
    //create a dummy bank api server where to get the token from;
    const token = Math.random().toString();
    await prisma.onRampTransactions.create({
        data: {
            amount,
            provider,
            startTime: new Date(),
            status: 'Processing',
            token,
            userId: 33,
        }
    });
    return { isError: false, message: 'OnRampTransaction started' }
};

export const getOnRampTransactions = async (userId: number) => {

    const txns = await prisma.onRampTransactions.findMany({
        where: {
            userId
        }
    });

    return {
        isError: false,
        message: 'Transactions fetched',
        data: txns }
}
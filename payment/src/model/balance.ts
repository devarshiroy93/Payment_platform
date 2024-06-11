import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const findBalanceByUserId = async (userId: number): Promise<
    any
> => {


    try {
        const res = await prisma.balances.findFirst({
            where: {
                userId
            }
        })
       
        return { isError: false, data: res };
    } catch (err) {
        console.log(err);
        return { isError: true, data: null }
    }

}




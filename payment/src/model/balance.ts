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

export const initialiseBalanceForNewUser = async (userId : number)=>{
    try {
        const res = await prisma.balances.create({
            data : {
                amount : 10,
                locked : 0,
                userId ,
            }
        })
       
        return { isError: false, data: res };
    } catch (err) {
        console.log(err);
        return { isError: true, data: null }
    }

}




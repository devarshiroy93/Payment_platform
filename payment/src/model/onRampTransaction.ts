import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const startOnRampTransaction = async (data: { amount: number, provider: string }) => {

    const { amount, provider } = data;
    //create a dummy bank api server where to get the token from;
    //const token = Math.random().toString();
    const dummyBankTokenRes = await fetchOnRampTokenFromMockBank(amount);
    console.log('dummyBankTokenRes', dummyBankTokenRes);
    const { success, token } = dummyBankTokenRes;
    if (!success) {
        return {
            isError: true,
            message: 'OnRampTransaction start failed'
        }
    }
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
    return {
        isError: false, message: 'OnRampTransaction started',
        data: { txnToken: dummyBankTokenRes.token }
    }
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
        data: txns
    }
}

const fetchOnRampTokenFromMockBank = async (amount: number) => {
    const res = await fetch(`${process.env.MOCK_BANK_URL}transaction/token-generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ passcode: "bankmocksishere", amount })
    });
    return res.json();
}
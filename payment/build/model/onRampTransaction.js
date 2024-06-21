"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnRampTransactions = exports.startOnRampTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const startOnRampTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, provider } = data;
    //create a dummy bank api server where to get the token from;
    //const token = Math.random().toString();
    const dummyBankTokenRes = yield fetchOnRampTokenFromMockBank(amount);
    console.log('dummyBankTokenRes', dummyBankTokenRes);
    const { success, token } = dummyBankTokenRes;
    if (!success) {
        return {
            isError: true,
            message: 'OnRampTransaction start failed'
        };
    }
    yield prisma.onRampTransactions.create({
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
    };
});
exports.startOnRampTransaction = startOnRampTransaction;
const getOnRampTransactions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const txns = yield prisma.onRampTransactions.findMany({
        where: {
            userId
        }
    });
    return {
        isError: false,
        message: 'Transactions fetched',
        data: txns
    };
});
exports.getOnRampTransactions = getOnRampTransactions;
const fetchOnRampTokenFromMockBank = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${process.env.MOCK_BANK_URL}transaction/token-generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ passcode: "bankmocksishere", amount })
    });
    return res.json();
});

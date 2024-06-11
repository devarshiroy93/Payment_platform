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
exports.bankWebHookModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bankWebHookModel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, userId, amount } = payload;
    try {
        const transaction = yield prisma.onRampTransactions.findFirst({
            where: {
                token
            }
        });
        if (!!transaction && transaction.status === 'Processing') {
            yield prisma.$transaction([
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
        }
        else {
            return {
                isError: true,
                message: 'Transaction process failed'
            };
        }
        return {
            isError: false,
            message: 'Transaction processed'
        };
    }
    catch (e) {
        console.error(e);
        throw new Error("Webhook failed");
    }
});
exports.bankWebHookModel = bankWebHookModel;

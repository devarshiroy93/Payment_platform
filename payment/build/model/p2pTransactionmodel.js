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
exports.createP2pTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createP2pTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, toUser, fromUser } = data;
    try {
        yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            //decrease senders balance
            yield prisma.balances.update({
                where: { userId: fromUser.id },
                data: { amount: { decrement: amount } }
            });
            //increase receivers balance
            yield prisma.balances.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } }
            });
            //add entry in p2ptransactions table
            yield prisma.p2pTransfers.create({
                data: {
                    amount,
                    fromUserId: fromUser.id,
                    fromUserName: `${fromUser.firstName} ${fromUser.lastName}`,
                    timeStamp: new Date(),
                    toUserId: toUser.id,
                    toUserName: `${toUser.firstName} ${toUser.lastName}`
                }
            });
        }));
        return {
            isError: false,
            message: 'Transactions successfull',
            data: null
        };
    }
    catch (err) {
        console.log('ERROR IN P2P');
        return {
            isError: true,
            message: 'Transactions failed',
            data: null
        };
    }
});
exports.createP2pTransaction = createP2pTransaction;

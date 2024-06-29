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
exports.initialiseBalanceForNewUser = exports.findBalanceByUserId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findBalanceByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.balances.findFirst({
            where: {
                userId
            }
        });
        return { isError: false, data: res };
    }
    catch (err) {
        console.log(err);
        return { isError: true, data: null };
    }
});
exports.findBalanceByUserId = findBalanceByUserId;
const initialiseBalanceForNewUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma.balances.create({
            data: {
                amount: 10,
                locked: 0,
                userId,
            }
        });
        return { isError: false, data: res };
    }
    catch (err) {
        console.log(err);
        return { isError: true, data: null };
    }
});
exports.initialiseBalanceForNewUser = initialiseBalanceForNewUser;

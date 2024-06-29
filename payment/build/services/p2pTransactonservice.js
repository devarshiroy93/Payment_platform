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
exports.p2pTransaction = void 0;
const p2pTransactionmodel_1 = require("../model/p2pTransactionmodel");
const p2pTransaction = (_a) => __awaiter(void 0, [_a], void 0, function* ({ amount, fromUser, toUserId, authToken }) {
    const toUserRes = yield fetchToUserDetails(toUserId, authToken.split(' ')[1]);
    console.log('authToken', authToken);
    console.log('toUser', toUserRes);
    if (!toUserRes.isSuccess) {
        return {
            isError: true,
            message: 'fetching user id failed',
            data: null
        };
    }
    const p2pTxn = yield (0, p2pTransactionmodel_1.createP2pTransaction)({ amount: Number(amount), fromUser, toUser: toUserRes.body });
    return p2pTxn;
});
exports.p2pTransaction = p2pTransaction;
const fetchToUserDetails = (userId, authToken) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${process.env.PLATFORM_AUTH_URL}api/v1/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
    });
    return res.json();
});

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
exports.fetchOnRampTransactions = exports.onRampTransaction = void 0;
const onRampTransaction_1 = require("../model/onRampTransaction");
const onRampTransaction = (amount, provider, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const onRampTxn = yield (0, onRampTransaction_1.startOnRampTransaction)({ amount, provider, userId });
    return onRampTxn;
});
exports.onRampTransaction = onRampTransaction;
const fetchOnRampTransactions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('userID', userId);
    const transactions = yield (0, onRampTransaction_1.getOnRampTransactions)(userId);
    return transactions;
});
exports.fetchOnRampTransactions = fetchOnRampTransactions;

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
exports.getOnRampTransactionsController = exports.startOnRampTransactionsController = void 0;
const onRampTransaction_1 = require("../services/onRampTransaction");
const startOnRampTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, provider } = req.body;
    const service = yield (0, onRampTransaction_1.onRampTransaction)(amount, provider);
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message,
        data: service.data
    });
});
exports.startOnRampTransactionsController = startOnRampTransactionsController;
const getOnRampTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the userId from token
    const userId = 33;
    const service = yield (0, onRampTransaction_1.fetchOnRampTransactions)(userId);
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message,
        data: service.data
    });
});
exports.getOnRampTransactionsController = getOnRampTransactionsController;

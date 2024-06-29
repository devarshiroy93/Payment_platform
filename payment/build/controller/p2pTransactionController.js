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
exports.p2pTransactionController = void 0;
const p2pTransactonservice_1 = require("../services/p2pTransactonservice");
const p2pTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, userId } = req.body;
    const authToken = req.headers['authorization'] || '';
    const user = req.user;
    const service = yield (0, p2pTransactonservice_1.p2pTransaction)({ amount, fromUser: user, toUserId: userId, authToken });
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message,
        data: service.data
    });
});
exports.p2pTransactionController = p2pTransactionController;

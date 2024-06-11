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
exports.webHookController = void 0;
const webHook_1 = require("../services/webHook");
const webHookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, userId, amount } = req.body;
    const service = yield (0, webHook_1.webHookServcice)({ amount, token, userId });
    return res.status(200).send({
        isSuccess: !service.isError,
        message: service.message
    });
});
exports.webHookController = webHookController;

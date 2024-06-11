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
exports.webHookServcice = void 0;
const bankWebhookmodel_1 = require("../model/bankWebhookmodel");
const webHookServcice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const webHookRes = yield (0, bankWebhookmodel_1.bankWebHookModel)(payload);
    return webHookRes;
});
exports.webHookServcice = webHookServcice;

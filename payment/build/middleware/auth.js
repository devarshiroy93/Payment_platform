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
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenString = req.headers['authorization'];
    ;
    console.log('auth', tokenString);
    if (!tokenString) {
        console.log('INVALID REQUEST');
        return res.status(400).send({
            isSuccess: false,
            token: null
        });
    }
    const token = (tokenString === null || tokenString === void 0 ? void 0 : tokenString.split(' ')[1]) || '';
    if (!token) {
        console.log('INVALID REQUEST.NO TOKEN FOUND');
        return res.status(400).send({
            isSuccess: false,
            token: null
        });
    }
    console.log('VERIFY TOKEN');
    const user = yield (0, jsonwebtoken_1.verify)(token, 'my-secret');
    req.user = user;
    console.log(user);
    next();
});
exports.auth = auth;

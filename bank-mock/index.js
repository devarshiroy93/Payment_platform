import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';
import * as approveView from './approve-view.js';

let globals = {
    currentTxnToken: ''
};


const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

const envFilePath = path.join(__dirname, '..', `${process.env.ENV}.env`);
console.log('envFilePath', envFilePath);
const prisma = new PrismaClient();
dotenv.config({
    path: `${process.env.ENV}.env`
});


const getFullUrl = (req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    req.originUrl = fullUrl;
    next();
}

app.post('/transaction/token-generate', async (req, res) => {

    const { passcode, amount } = req.body;
    const uuid = randomUUID();
    if (passcode === process.env.PASSCODE) {
        await prisma.transactions.create({
            data: {
                amount,
                status: 'Processing',
                token: uuid,
                startTime: new Date(),
                userId: 1001
            }
        });
        return res.send({
            success: true,
            token: uuid
        });
    }
    return res.send({
        success: false,
        token: null
    });
});

app.get('/', (req, res) => {
    const txnToken = req.query.token;
    globals.currentTxnToken = txnToken;
    res.sendFile(__dirname + '/public/login.html')
});

app.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
    const { customerID, password } = req.body
    console.log('login', customerID, password);
    if (customerID && password && Number(customerID) === 1001 && Number(password) === 200693) {
        const txn = await prisma.transactions.findFirst({ where: { token: globals.currentTxnToken } });
        console.log('transaction', txn);
        const approveViewHTML = approveView.generateApproveView(txn.amount, txn.token);
        return res.send(approveViewHTML);
    } else {
        return res.sendFile(__dirname + '/public/login-error.html');
    }

})
app.post('/approve-payment', express.urlencoded({ extended: true }), async (req, res) => {

    const { amount, token } = req.body;
    const transactionExists = prisma.transactions.findFirst({
        where: {
            token: token
        }
    });
    if (transactionExists.status === 'Processing') {
        res.sendFile(__dirname + '/public/invalid-transaction.html');
        return;
    }
    const webookRes = await completeTxn(amount, token);
    console.log('sas', webookRes)
    res.sendFile(__dirname + '/public/transaction-success.html');
    return
});

const completeTxn = async (amount, token) => {
    const res = await fetch(`${process.env.WEBHOOK_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, token })
    });
    return res.json();
}
app.listen(process.env.PORT || 4042, () => {
    console.log('Server up and running', process.env.PORT);
});





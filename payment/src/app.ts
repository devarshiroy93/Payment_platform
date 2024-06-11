import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getBalanceController } from './controller/balance';
import { getOnRampTransactionsController, startOnRampTransactionsController } from './controller/onRampTransactionController';
import { webHookController } from './controller/webHookController';

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
const transactionRouter = express.Router();


const envFilePath = path.join(__dirname, '..', `${process.env.ENV}.env`);
console.log('envFilePath', envFilePath);

dotenv.config({
  path: `${process.env.ENV}.env`
});


const balanceRoutes = router.get('/', getBalanceController);;
const onRampTransactionRoutes = transactionRouter.post('/', startOnRampTransactionsController);
const getonRampTransactionRoutes = transactionRouter.get('/', getOnRampTransactionsController);
const webHookRoutes = transactionRouter.post('/process', webHookController);


app.use('/balance', balanceRoutes);
app.use('/onRamp', onRampTransactionRoutes);
app.use('/transactions', getonRampTransactionRoutes);
app.use('/transactions', webHookRoutes);


app.listen(process.env.PORT, () => {
  console.log('Server listening to' + process.env.PORT);
});


import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getBalanceController } from './controller/balance';
import { getOnRampTransactionsController, startOnRampTransactionsController } from './controller/onRampTransactionController';
import { webHookController } from './controller/webHookController';
import { initialiseBalanceForNewUser } from './controller/initialiseBalanceForNewUser';
import { auth } from './middleware/auth';
import { p2pTransactionController } from './controller/p2pTransactionController';

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
const transactionRouter = express.Router();
const p2pTransactionRouter = express.Router();


const envFilePath = path.join(__dirname, '..', `${process.env.ENV}.env`);
console.log('envFilePath', envFilePath);

dotenv.config({
  path: `${process.env.ENV}.env`
});


const balanceRoutes = router.get('/', getBalanceController);
const initialiseBalanceForNewUserRoute = router.post('/', initialiseBalanceForNewUser)
const onRampTransactionRoutes = transactionRouter.post('/', auth, startOnRampTransactionsController);
const getonRampTransactionRoutes = transactionRouter.get('/', auth, getOnRampTransactionsController);
const webHookRoutes = transactionRouter.post('/process', webHookController);
const p2pTransactionRoutes = p2pTransactionRouter.post('/', auth, p2pTransactionController)

app.use('/balance', balanceRoutes);
app.use('/balance', initialiseBalanceForNewUserRoute);
app.use('/onRamp', onRampTransactionRoutes);
app.use('/transactions', getonRampTransactionRoutes);
app.use('/transactions', webHookRoutes);
app.use('/p2pTransaction', p2pTransactionRoutes)


app.listen(process.env.PORT, () => {
  console.log('Server listening to' + process.env.PORT);
});


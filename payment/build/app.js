"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const balance_1 = require("./controller/balance");
const onRampTransactionController_1 = require("./controller/onRampTransactionController");
const webHookController_1 = require("./controller/webHookController");
const initialiseBalanceForNewUser_1 = require("./controller/initialiseBalanceForNewUser");
const auth_1 = require("./middleware/auth");
const p2pTransactionController_1 = require("./controller/p2pTransactionController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const router = express_1.default.Router();
const transactionRouter = express_1.default.Router();
const p2pTransactionRouter = express_1.default.Router();
const envFilePath = path_1.default.join(__dirname, '..', `${process.env.ENV}.env`);
console.log('envFilePath', envFilePath);
dotenv_1.default.config({
    path: `${process.env.ENV}.env`
});
const balanceRoutes = router.get('/', balance_1.getBalanceController);
const initialiseBalanceForNewUserRoute = router.post('/', initialiseBalanceForNewUser_1.initialiseBalanceForNewUser);
const onRampTransactionRoutes = transactionRouter.post('/', auth_1.auth, onRampTransactionController_1.startOnRampTransactionsController);
const getonRampTransactionRoutes = transactionRouter.get('/', auth_1.auth, onRampTransactionController_1.getOnRampTransactionsController);
const webHookRoutes = transactionRouter.post('/process', webHookController_1.webHookController);
const p2pTransactionRoutes = p2pTransactionRouter.post('/', auth_1.auth, p2pTransactionController_1.p2pTransactionController);
app.use('/balance', balanceRoutes);
app.use('/balance', initialiseBalanceForNewUserRoute);
app.use('/onRamp', onRampTransactionRoutes);
app.use('/transactions', getonRampTransactionRoutes);
app.use('/transactions', webHookRoutes);
app.use('/p2pTransaction', p2pTransactionRoutes);
app.listen(process.env.PORT, () => {
    console.log('Server listening to' + process.env.PORT);
});

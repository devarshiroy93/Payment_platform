import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { randomUUID } from 'crypto';

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

const envFilePath = path.join(__dirname, '..', `${process.env.ENV}.env`);
console.log('envFilePath', envFilePath);

dotenv.config({
    path: `${process.env.ENV}.env`
});


const getFullUrl = (req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    req.originUrl = fullUrl;
    next();
}

app.post('/transaction/token-generate', (req, res) => {

    const { passcode } = req.body;
    const uuid = randomUUID();
    if (passcode === process.env.PASSCODE) {
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
    res.sendFile(__dirname + '/public/login.html')
});

app.post('/login',express.urlencoded({ extended: true }), (req, res) => {
    const  {customerID , password }= req.body
    console.log('login',customerID , password);
    if(customerID && password && Number(customerID) === 1001 && Number(password) === 200693){
        return res.sendFile(__dirname + '/public/approve-payment.html');
    }else{
        return res.sendFile(__dirname + '/public/login-error.html');
    }
    
})

app.listen(process.env.PORT || 4042, () => {
    console.log('Server up and running', process.env.PORT);
});





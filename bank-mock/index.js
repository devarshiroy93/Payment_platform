import express from 'express';

const app = express();

app.use(cors());

app.listen(process.env.PORT || 4041, () => {
    console.log('Server up and running');
});

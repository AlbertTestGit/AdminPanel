import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './db.js';
import userRouter from './routers/userRouter.js';

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());

app.use('/api/users', userRouter);


const start = async () => {
    try {
        await sequelize.sync({ force: true });

        app.listen(3000, () => console.log(`Example app listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();

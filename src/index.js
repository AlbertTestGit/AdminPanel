import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bcrypt from 'bcryptjs';
import { sequelize, User } from './db.js';
import { roles } from './models/user.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('src/demoapp/dist/demoapp'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


app.get('*', function(req,res) {
    res.sendFile(path.resolve('src/demoapp/dist/demoapp/index.html'));
});


const start = async () => {
    try {
        await sequelize.sync({ force: true });

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (await User.findAll().length == 0) {
            await User.create({
                name: "Admin",
                email: adminEmail,
                licenseNumber: "111",
                role: roles.Administrator,
                password: bcrypt.hashSync(adminPassword, 10)
            });

            console.log('\x1b[36m%s\x1b[0m', `\nAdmin user created. Email: ${adminEmail}, Password: ${adminPassword}\n`);
        }

        app.listen(3000, () => console.log(`Example app listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();

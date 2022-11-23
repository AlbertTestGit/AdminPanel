import bcrypt from 'bcryptjs';
import generator from 'generate-password';
import jwt from 'jsonwebtoken';
import { roles } from '../models/user.js';
import userService from '../services/userService.js';

class AuthController {
    async registration(req, res) {
        const { name, email, licenseNumber } = req.body;

        if (await userService.getByEmail(email)) {
            return res.status(400).send('Bad request');
        }

        const password = generator.generate({
            length: 8,
            numbers: true
        });

        // TODO: отправить пароль по почте

        const passwordHash = bcrypt.hashSync(password, 10);

        await userService.create(name, email, licenseNumber, roles.SubsoilUser, passwordHash);

        res.send(`Registration completed successfully. Password: ${password}`);
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await userService.getByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).send('email or password is incorrect');
        }

        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            licenseNumber: user.licenseNumber,
            role: user.role
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        return res.json({ accessTpken: token });
    }
}

export default new AuthController();

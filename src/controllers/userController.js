import bcrypt from 'bcryptjs';
import { User } from '../db.js';

class UserController {
    async getAll(req, res) {
        const users = await User.findAll();

        res.send(users);
    }

    async getOne(req, res) {
        const userId = req.params.userId;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('Not found');
        }

        res.send(user);
    }

    async create(req, res) {
        const { name, email, licenseNumber, role, password } = req.body;

        if (await User.findOne({ where: { email } })) {
            return res.status(400).send('Bad request');
        }

        const user = await User.create({
            name,
            email,
            licenseNumber,
            role,
            password: bcrypt.hashSync(password, 10)
        })

        res.send(user);
    }

    async update(req, res) {
        const { id, name, email, licenseNumber, role, password } = req.body;
        
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).send('Bad request');
        }

        if (name != undefined) user.name = name;

        if (email != undefined) {
            if (await User.findOne({ where: { email } })) return res.status(400).send('Bad request');

            user.email = email;
        }

        if (licenseNumber != undefined) user.licenseNumber = licenseNumber;

        if (role != undefined) user.role = role;

        if (password != undefined) bcrypt.hashSync(password, 10);


        await user.save();

        res.send(user);
    }

    async delete(req, res) {
        const userId = req.params.userId;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('Not found');
        }

        await user.destroy();

        res.send('Delete User');
    }
}

export default new UserController();

import bcrypt from 'bcryptjs';
import { User } from '../db.js';
import { roles } from '../models/user.js';
import userService from '../services/userService.js';

class UserController {
    async getAll(req, res) {
        const users = await userService.getAll();

        res.send(users);
    }

    async getOne(req, res) {
        const userId = req.params.userId;

        const user = await userService.getById(userId);

        if (!user) {
            return res.status(404).send('Not found');
        }

        res.send(user);
    }

    async create(req, res) {

        if (req.user.role !== roles.Administrator || req.user.role !== roles.Operator) {
            return res.status(403).json({ message: 'Forbiden' });
        }

        const { name, email, licenseNumber, role, password } = req.body;

        if (await userService.getByEmail(email)) {
            return res.status(400).send('Bad request');
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        
        res.send(await userService.create(name, email, licenseNumber, role, passwordHash));
    }

    async update(req, res) {
        if (req.user.role !== roles.Administrator || req.user.role !== roles.Operator) {
            return res.status(403).json({ message: 'Forbiden' });
        }
        
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
        if (req.user.role !== roles.Administrator || req.user.role !== roles.Operator) {
            return res.status(403).json({ message: 'Forbiden' });
        }

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

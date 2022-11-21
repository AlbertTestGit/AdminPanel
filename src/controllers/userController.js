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

        res.send('Get One User');
    }

    async create(req, res) {
        const { name, email, licenseNumber, role, password } = req.body;

        if (await User.findOne({ where: { email } })) {
            res.status(400).send('Bad reques');
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
        res.send('Update User');
    }

    async delete(req, res) {
        res.send('Delete User');
    }
}

export default new UserController();

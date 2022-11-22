import { User } from '../db.js';

class UserService {
    async getAll() {
        return await User.findAll();
    }

    async getById(userId) {
        return await User.findByPk(userId);
    }

    async getByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async create(name, email, licenseNumber, role, passwordHash) {
        const user = await User.create({
            name,
            email,
            licenseNumber,
            role,
            password: passwordHash
        });

        return user;
    }
}

export default new UserService();

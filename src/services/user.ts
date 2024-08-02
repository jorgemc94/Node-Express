import { ServicesGeneric } from "../utils/services";
import { UserModel } from "../models/users";
import { User } from "../interfaces/User";
import bcrypt from 'bcryptjs';

export class UserService extends ServicesGeneric<User> {
    constructor() {
        super(UserModel);
    }

    async addUser(user: User): Promise<User> {
        const existingUser = await this.model.findOne({ email: user.email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        const userWithHashedPassword = {
            ...user,
            password: hashedPassword
        };

        return this.post(userWithHashedPassword);
    }
}

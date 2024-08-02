import bcrypt from 'bcryptjs';
import { UserModel } from '../models/users';
import { generateAccessToken } from '../utils/auth';

export class LoginService {
    static async authenticateUser(email: string, password: string): Promise<string> {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = generateAccessToken(user.email);
            return token;
        } else {
            throw new Error('Invalid credentials');
        }
    }
}

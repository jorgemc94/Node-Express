import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/auth';
import { User } from '../interfaces/User';
import { connectionSQL } from '../db';
import { RowDataPacket } from 'mysql2';

export class LoginService {
    static async authenticateUser(user: User): Promise<string> {
        
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM users WHERE name = ?', [user.name]);

        if (rows.length === 0) {
            throw new Error('Invalid credentials');
        }

        const userCheck = rows[0] as any; 
        const match = await bcrypt.compare(user.password, userCheck.password);

        if (match) {
            const token = generateAccessToken(user.name);
            return token;
        } else {
            throw new Error('Invalid credentials');
        }
    }
}

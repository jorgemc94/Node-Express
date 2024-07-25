import { generateAccessToken } from '../utils/auth';

export class LoginService {

    static authenticateUser(username: string, password: string): string {
        
        const placeholderUser = {
            email: 'jorgemc1294@gmail.com',
            password: '12345'
        };
        
        if (username === placeholderUser.email && password === placeholderUser.password) {
            const token = generateAccessToken(placeholderUser.email);
            return token;
        } else {
            throw new Error('Invalid credentials');
        }
    }
}


import { connectionSQL } from '../db';
import { User } from '../interfaces/User';
import { RowDataPacket } from 'mysql2';
import mysql from 'mysql2/promise';

export class UserService {

    // Obtener todos los usuarios
    static async getAllUsers(): Promise<User[]> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM users');
        return rows.map(row => ({
            _id: (row as any)._id,
            name: (row as any).name,
            email: (row as any).email,
            phone: (row as any).phone,
            photo: (row as any).photo,
            position: {
                name: (row as any).position_name,
                description: (row as any).position_description
            },
            date: (row as any).date,
            status: (row as any).status,
            password: (row as any).password
        }));
    }

    // Obtener un usuario por ID
    static async getUserById(id: number): Promise<User> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM users WHERE _id = ?', [id]);
        if (rows.length === 0) {
            throw new Error('User not found');
        }
        const row = rows[0] as any;
        return {
            _id: row._id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            photo: row.photo,
            position: {
                name: row.position_name,
                description: row.position_description
            },
            date: row.date,
            status: row.status,
            password: row.password
        };
    }

    // Añadir un nuevo usuario
    static async addUser(user: User): Promise<User> {
        const { name, email, phone, photo, position, date, status, password } = user;
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const [result] = await connectionSQL.query('INSERT INTO users (name, email, phone, photo, position_name, position_description, date, status, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [name, email, phone, photo, position?.name, position?.description, formattedDate, status, password]);
        
        const newId = (result as mysql.ResultSetHeader).insertId;
        return { ...user, _id: newId };
    }

    // Eliminar un usuario por ID
    static async deleteUser(id: number): Promise<void> {
        const [result] = await connectionSQL.query('DELETE FROM users WHERE _id = ?', [id]);
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('User not found');
        }
    }

    // Actualizar un usuario por ID
    static async updateUser(id: number, user: Partial<User>): Promise<User> {
        const { name, email, phone, photo, position, date, status, password } = user;
        const [result] = await connectionSQL.query('UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), phone = COALESCE(?, phone), photo = COALESCE(?, photo), position_name = COALESCE(?, position_name), position_description = COALESCE(?, position_description), date = COALESCE(?, date), status = COALESCE(?, status), password = COALESCE(?, password) WHERE _id = ?', 
            [name, email, phone, photo, position?.name, position?.description, date, status, password, id]);

        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('User not found');
        }

        return this.getUserById(id);  // Retornar el usuario actualizado
    }
}

import { connectionSQL } from '../db';
import { Contact } from '../interfaces/Contact';
import { RowDataPacket } from 'mysql2';
import mysql from 'mysql2/promise';

export class ContactService {
    // Ver todos los contactos
    static async getAllContacts(): Promise<Contact[]> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM contacts');
        return rows as Contact[];
    }

    // Ver un contacto por ID
    static async getContact(id: number): Promise<Contact> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM contacts WHERE _id = ?', [id]);

        if (rows.length === 0) {
            throw new Error('Contact not found');
        }

        return rows[0] as Contact;
    }

    // Añadir un nuevo contacto
    static async addContact(contact: Contact): Promise<Contact> {
        const { date, client, subject, comment, archived } = contact;
        const [result] = await connectionSQL.query('INSERT INTO contacts (date, name, email, phone, image, subject, comment, archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [date, client.name, client.email, client.phone, client.image, subject, comment, archived]);
        
        const newId = (result as mysql.ResultSetHeader).insertId;
        return { ...contact, _id: newId };
    }

    // Actualizar un contacto existente
    static async updateContact(id: number, updatedContact: Partial<Contact>): Promise<Contact> {
        const { date, client, subject, comment, archived } = updatedContact;
        const [result] = await connectionSQL.query('UPDATE contacts SET date = ?, name = ?, email = ?, phone = ?, image = ?, subject = ?, comment = ?, archived = ? WHERE _id = ?', 
            [date, client?.name, client?.email, client?.phone, client?.image, subject, comment, archived, id]);
        
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Contact not found');
        }
        
        return { _id: id, ...updatedContact } as Contact;
    }

    // Eliminar un contacto
    static async deleteContact(id: number): Promise<void> {
        const [result] = await connectionSQL.query('DELETE FROM contacts WHERE _id = ?', [id]);
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Contact not found');
        }
    }
}

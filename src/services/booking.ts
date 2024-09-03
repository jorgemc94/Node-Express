
import { connectionSQL } from '../db';
import { Booking } from '../interfaces/Booking';
import { RowDataPacket } from 'mysql2';
import mysql from 'mysql2/promise';

export class BookingService {

    // Ver todos los bookings
    static async getAllBookings(): Promise<Booking[]> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM bookings');
        return rows as Booking[];
    }

    // Ver un booking por ID
    static async getBooking(id: number): Promise<Booking> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM bookings WHERE _id = ?', [id]);

        if (rows.length === 0) {
            throw new Error('Booking not found');
        }

        return rows[0] as Booking;
    }

    // Añadir un nuevo booking
    static async addBooking(booking: Booking): Promise<Booking> {
        const { fullName, bookDate, checkIn, checkOut, specialRequest, room_id, status } = booking;
        const formattedBookDate = new Date(bookDate).toISOString().split('T')[0];
        const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
        const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];
    
        const [result] = await connectionSQL.query(
            'INSERT INTO bookings (fullName, bookDate, checkIn, checkOut, specialRequest, room_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [fullName, formattedBookDate, formattedCheckIn, formattedCheckOut, specialRequest, room_id, status]
        );
    
        const newId = (result as mysql.ResultSetHeader).insertId;
        return { ...booking, _id: newId };
    }
    

    // Eliminar un booking por ID
    static async deleteBooking(id: number): Promise<void> {
        const [result] = await connectionSQL.query('DELETE FROM bookings WHERE _id = ?', [id]);

        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Booking not found');
        }
    }

    // Actualizar un booking por ID
    static async updateBooking(id: number, updatedBooking: Partial<Booking>): Promise<Booking> {
        const { fullName, bookDate, checkIn, checkOut, specialRequest, room_id, status } = updatedBooking;
        const [result] = await connectionSQL.query('UPDATE bookings SET fullName = ?, bookDate = ?, checkIn = ?, checkOut = ?, specialRequest = ?, room_id = ?, status = ? WHERE _id = ?', 
            [fullName, bookDate, checkIn, checkOut, specialRequest, room_id, status, id]);
        
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Booking not found');
        }
        
        return { _id: id, ...updatedBooking } as Booking;
    }
}

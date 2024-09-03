
import { Room } from "../interfaces/Room";
import { connectionSQL } from '../db';
import { RowDataPacket } from 'mysql2';
import mysql from 'mysql2/promise';

export class RoomService {
    // Ver todos los registros de habitaciones
    static async getAllRooms(): Promise<Room[]> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM rooms');
        return rows as Room[];
    }

    // Ver una habitación por ID
    static async getRoomById(id: number): Promise<Room> {
        const [rows] = await connectionSQL.query<RowDataPacket[]>('SELECT * FROM rooms WHERE _id = ?', [id]);
        if (rows.length === 0) {
            throw new Error('Room not found');
        }        
        
        return rows[0] as Room;
    }

    // Añadir una nueva habitación
    static async addRoom(room: Room): Promise<Room> {
        const { roomNumber, status, roomType, description, offer, price, discount, cancellation, amenities, photosArray } = room;
        const [result] = await connectionSQL.query(
            'INSERT INTO rooms (roomNumber, status, roomType, description, offer, price, discount, cancellation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [roomNumber, status, roomType, description, offer, price, discount, cancellation]
        );
    
        const newId = (result as mysql.ResultSetHeader).insertId;
        const amenitiesPromises = amenities.map(amenity => {
            return connectionSQL.query(
                'INSERT INTO amenities (room_id, amenitie) VALUES (?, ?)', 
                [newId, amenity]
            );
        });
        
        const photosPromises = photosArray.map(photoUrl => {
            return connectionSQL.query(
                'INSERT INTO photosArray (room_id, photo_url) VALUES (?, ?)', 
                [newId, photoUrl]
            );
        });
        await Promise.all([...amenitiesPromises, ...photosPromises]);
    
        return { ...room, _id: newId };
    }
    

    // Actualizar una habitación existente
    static async updateRoom(id: number, room: Partial<Room>): Promise<Room> {
        const { roomNumber, status, roomType, description, offer, price, discount, cancellation } = room;
        
        const [result] = await connectionSQL.query('UPDATE rooms SET roomNumber = ?, status = ?, roomType = ?, description = ?, offer = ?, price = ?, discount = ?, cancellation = ? WHERE _id = ?', 
            [roomNumber, status, roomType, description, offer, price, discount, cancellation, id]);
        
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Room not found');
        }
        
        return this.getRoomById(id);
    }

    // Eliminar una habitación
    static async deleteRoom(id: number): Promise<void> {
        
        const [result] = await connectionSQL.query('DELETE FROM rooms WHERE _id = ?', [id]);
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Room not found');
        }
    }
}

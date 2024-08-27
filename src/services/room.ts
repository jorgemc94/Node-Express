
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
        const roomData = rows[0] as any;
        const [amenitiesRows] = await connectionSQL.query<RowDataPacket[]>('SELECT amenity FROM room_amenities WHERE room_id = ?', [id]);
        const [photosRows] = await connectionSQL.query<RowDataPacket[]>('SELECT photo_url FROM room_photos WHERE room_id = ?', [id]);

        const room: Room = {
            _id: roomData._id,
            roomNumber: roomData.roomNumber,
            availability: roomData.availability,
            roomType: roomData.roomType,
            description: roomData.description,
            offer: roomData.offer,
            price: roomData.price,
            discount: roomData.discount,
            cancellation: roomData.cancellation,
            booking_id: roomData.booking_id,
            amenities: amenitiesRows.map(row => (row as any).amenity),
            photosArray: photosRows.map(row => (row as any).photo_url)
        };

        return room;
    }

    // Añadir una nueva habitación
    static async addRoom(room: Room): Promise<Room> {
        const { roomNumber, availability, roomType, description, offer, price, discount, cancellation, booking_id, amenities, photosArray } = room;
        
        const [result] = await connectionSQL.query('INSERT INTO rooms (roomNumber, availability, roomType, description, offer, price, discount, cancellation, booking_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [roomNumber, availability, roomType, description, offer, price, discount, cancellation, booking_id]);

        const newId = (result as mysql.ResultSetHeader).insertId;
        
        const amenitiesPromises = amenities.map(amenity => {
            return connectionSQL.query('INSERT INTO room_amenities (room_id, amenity) VALUES (?, ?)', [newId, amenity]);
        });
        
        const photosPromises = photosArray.map(photoUrl => {
            return connectionSQL.query('INSERT INTO room_photos (room_id, photo_url) VALUES (?, ?)', [newId, photoUrl]);
        });
        
        await Promise.all([...amenitiesPromises, ...photosPromises]);

        return { ...room, _id: newId };
    }

    // Actualizar una habitación existente
    static async updateRoom(id: number, room: Partial<Room>): Promise<Room> {
        const { roomNumber, availability, roomType, description, offer, price, discount, cancellation, booking_id, amenities, photosArray } = room;
        
        const [result] = await connectionSQL.query('UPDATE rooms SET roomNumber = ?, availability = ?, roomType = ?, description = ?, offer = ?, price = ?, discount = ?, cancellation = ?, booking_id = ? WHERE _id = ?', 
            [roomNumber, availability, roomType, description, offer, price, discount, cancellation, booking_id, id]);
        
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Room not found');
        }
        
        if (amenities) {
            await connectionSQL.query('DELETE FROM room_amenities WHERE room_id = ?', [id]);
            const amenitiesPromises = amenities.map(amenity => {
                return connectionSQL.query('INSERT INTO room_amenities (room_id, amenity) VALUES (?, ?)', [id, amenity]);
            });
            await Promise.all(amenitiesPromises);
        }
        
        if (photosArray) {
            await connectionSQL.query('DELETE FROM room_photos WHERE room_id = ?', [id]);
            const photosPromises = photosArray.map(photoUrl => {
                return connectionSQL.query('INSERT INTO room_photos (room_id, photo_url) VALUES (?, ?)', [id, photoUrl]);
            });
            await Promise.all(photosPromises);
        }

        return this.getRoomById(id);
    }

    // Eliminar una habitación
    static async deleteRoom(id: number): Promise<void> {
        await connectionSQL.query('DELETE FROM room_amenities WHERE room_id = ?', [id]);
        await connectionSQL.query('DELETE FROM room_photos WHERE room_id = ?', [id]);
        
        const [result] = await connectionSQL.query('DELETE FROM rooms WHERE _id = ?', [id]);
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            throw new Error('Room not found');
        }
    }
}

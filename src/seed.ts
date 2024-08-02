import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { connectdb } from './db';
import { Room } from './interfaces/Room';
import { RoomService } from './services/room';
import { nameType, User } from './interfaces/User';
import { UserService } from './services/user';
import { Contact, archivedType } from './interfaces/Contact';
import { ContactService} from './services/contact';
import { Booking } from './interfaces/Booking';
import { BookingService } from './services/booking';
import bcrypt from 'bcryptjs';

const NumBookings = 50;
const NumContacts = 15;
const NumRooms = 50;
const NumUsers = 20;

connectdb().catch(error => console.log(error));

const run = async () => {
    await mongoose.connection.dropDatabase();

    const CreatedContact: Contact[] = [];
    const contactService = new ContactService();
    const archived: archivedType[] = ["true", "false"];

    for (let i = 0; i < NumContacts; i++) {
        const archivedType = faker.helpers.arrayElement(archived)
        const DataContact: Contact = {
            date: faker.date.past().toISOString(),
            client: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                image: faker.image.url(),
            },
            subject: faker.lorem.sentence(),
            comment: faker.lorem.sentence(),
            archived: archivedType,
        }
        
        const NewContact = await contactService.post(DataContact)
        CreatedContact.push(NewContact);
    }

    const CreatedRoom: Room[] = [];
    const roomService = new RoomService();

    const amenities: string[] = ['Air conditioner', 'High speed WiFi', 'Breakfast', 'Kitchen', 'Cleaning', 'Shower', 'Grocery', 'Shop Near', 'Towels', 'TV', 'Beach views'];

    for (let i = 0; i < NumRooms; i++) {
        const photosArray: string[] = [];
        for (let j = 0; j < 4; j++) {
            photosArray.push(faker.image.url());
        }
        const DataRoom: Room = {
            roomNumber: faker.number.int({ min: 1, max: 100 }),
            availability: Math.random() < 0.5 ? 'available' : 'booked',
            roomType: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            offer: Math.random() < 0.5,
            price: faker.number.int({ min: 10, max: 500 }),
            discount: faker.number.int({ min: 0, max: 50 }),
            cancellation: faker.lorem.sentence(),
            amenities: faker.helpers.arrayElements(amenities, { min: 1, max: 5 }),
            photosArray: photosArray,
        };

        const NewRoom = await roomService.post(DataRoom);
        CreatedRoom.push(NewRoom);
    }

    const CreatedUser: User[] = []
    const userService = new UserService();
    const password = faker.internet.password();
    const passwordHashed = await bcrypt.hash(password, 10)

    const name: nameType[] = ["Manager" , "Room service" , "Reception"];

    for (let i = 0; i < NumUsers; i++) {
        const positionName = faker.helpers.arrayElement(name);
        const DataUser: User = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            photo: faker.image.url(),
            position:{
                name: positionName,
                description: faker.lorem.sentence(),
            },
            date: faker.date.past().toISOString(),
            status: faker.helpers.arrayElement(["valid", "invalid"]),
            password:passwordHashed,
        }
        
        const NewUser = await userService.post(DataUser);
        CreatedUser.push(NewUser);
    }

    const mypassword = '12345';
    const mypasswordHashed = await bcrypt.hash(mypassword, 10)
    const PersonalUser : User = {
        name: 'Jorge Macias Cordobés',
        email: 'jorgemc1294@gmail.com',
        phone: faker.phone.number(),
        photo: faker.image.url(),
        position:{
            name: 'Manager',
            description: faker.lorem.sentence(),
        },
        date: faker.date.past().toISOString(),
        status: faker.helpers.arrayElement(["valid", "invalid"]),
        password:mypasswordHashed,
    }

    const MyUser = await userService.post(PersonalUser)
    CreatedUser.push(MyUser);

    const CreatedBooking: Booking [] = [];
    const bookingService = new BookingService();

    for (let i = 0; i < NumBookings; i++) {
        const orderDate: Date = faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' });
        const checkInDate: Date = new Date(orderDate);
        checkInDate.setDate(orderDate.getDate() + faker.number.int({ min: 1, max: 10 }));
        const checkOutDate: Date = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + faker.number.int({ min: 2, max: 20 }));
        const roomId: string = (CreatedRoom[Math.floor(Math.random() * 50)] as { _id: string })._id;

        const DataBooking: Booking = {
            fullName: `Booking ${faker.number.int({min: 0, max: 999})}`,
            bookDate: faker.date.past().toISOString(),
            checkIn: checkInDate.toISOString().split('T')[0],
            checkOut: checkOutDate.toISOString().split('T')[0],
            specialRequest: faker.lorem.sentence(),
            roomId: roomId,
            status: faker.helpers.arrayElement(["In progress", "Check In", "Check Out"]),
        }
        
        const NewBooking = await bookingService.post(DataBooking)
        CreatedBooking.push(NewBooking);
    }
}

run();

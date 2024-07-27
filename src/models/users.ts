import mongoose, {Schema} from "mongoose";
import { User } from "../interfaces/User";

const UserSchema = new Schema<User> ({
    id: {type:Number, required: true},
    name: {type:String, required: true},
    email: {type:String, required: true},
    phone: {type:String, required: true},
    photo: {type:String, required: true},
    position: {
        name: {type:String, enum: ["Manager" , "Room service" , "Reception"], required: true},
        description:{type:String, enum: ["valid" , "invalid" , ""], required: true}
    },
    date: {type:String, required: true},
    status:{type:String, required: true},
    password: {type:String, required: true}
});

export const UserModel = mongoose.model<User>('UserModel', UserSchema,'user');
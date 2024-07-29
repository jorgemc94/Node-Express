import { ServicesGeneric } from "../utils/services";
import { UserModel } from "../models/users"; 
import { User } from "../interfaces/User";

export class UserService extends ServicesGeneric<User> {
    constructor() {
        super(UserModel);
    }
}

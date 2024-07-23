import { ServicesGeneric } from "../utils/services";
import { User } from "../interfaces/User";
import { UsersData } from "../data/users";

export class UserService extends ServicesGeneric<User> {
    constructor () {
        super(UsersData)
    }
}
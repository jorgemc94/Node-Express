import { ServicesGeneric } from "../utils/services";
import { UsersData } from "../data/users";
import { User } from "../interfaces/User";

export class UserService extends ServicesGeneric<User> {
    constructor () {
        super(UsersData);
    }
}

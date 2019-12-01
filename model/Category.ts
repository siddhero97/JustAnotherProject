import {User} from "./User";

export class Category{
    private hobby: string;
    private users: User[] = [];


    constructor(hobby: string) {
        this.hobby = hobby;
        console.log("HOBBY ", name, ": initialized");
    }
    public addUser(user: User) : void {
        this.users.push(user);
    }

    public getUsers() {
        return this.users;
    }
}

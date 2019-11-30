import {User} from "./User";

export class Hobby{
    private name: string;
    private listOfUsers: User[];


    constructor(name: string) {
        this.name = name;
        this.listOfUsers = [];
        console.log("HOBBY ", name, ": initialized");
    }
    public addUser(user: User) : void {
         this.listOfUsers.push(user);
    }

    public getUsers() {
        return this.listOfUsers;
    }
}

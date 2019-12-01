
export class User{
    private pid: string;
    private userName: string;
    private hobbies: string[];

    public constructor(pid: string) {
        this.pid = pid;
        this.hobbies = [];
    }

    public getPid(): string {
        return this.pid;
    }
    public getUserName(): string {
        return this.userName;
    }

    public setPid(pid: string) {
        this.pid = pid;
    }

    public setUsername(userName: string){
        this.userName = userName;
    }
    public getHobbies(): string[] {
        return this.hobbies;
    }

    public addHobby(hobby: string) {
        this.hobbies.push(hobby);
    }

    public addHobies(hobbies: string[]) {
        this.hobbies.concat(hobbies);
    }


}

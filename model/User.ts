export class User{
    private pid: string;
    private userName: string;

    public constructor(pid: string, userName: string) {
        this.pid = pid;
        this.userName = userName;
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


}

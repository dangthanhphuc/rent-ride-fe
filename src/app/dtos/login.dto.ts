export class LoginDTO  {

    username : string;
    password: number;

    constructor(data : any) {
        this.username = data.username;
        this.password = data.password;
    }
}
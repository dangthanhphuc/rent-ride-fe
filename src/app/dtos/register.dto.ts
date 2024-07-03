export class RegisterDTO  {
    name: string;
    phone_number: string;
    email: string;
    date_of_birth: Date;
    username : string;
    password: number;

    constructor(data : any) {
        this.name = data.name;
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.date_of_birth = data.date_of_birth;
        this.username = data.username;
        this.password = data.password;
    }
}
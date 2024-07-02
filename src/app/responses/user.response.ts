import { LicenseResponse } from "./license.response";
import { RoleResponse } from "./role.response";

export interface UserResponse {
    id : number;
    name: string;
    phone_number : string;
    img_url : string;
    email : string;
    date_of_birth : Date;
    username : string;
    license?: LicenseResponse; 
    role : RoleResponse;
}
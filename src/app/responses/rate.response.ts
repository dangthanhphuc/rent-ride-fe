import { CarResponse } from "./car.response";
import { UserResponse } from "./user.response";

export interface RateResponse {
    id : number;
    star : number;
    comment : string;
    date : Date;
    user : UserResponse;
    car : CarResponse;
}
import { DeliveryResponse } from "./delivery.response";
import { ModelResponse } from "./model.response";
import { UserResponse } from "./user.response";
import { UtilityDetailResponse } from "./utility.detail.response";

export interface CarResponse {
    id : number;
    license_plate : string;
    address : string;
    price : number;
    instant : boolean;
    mortgage : boolean;
    rent : boolean;
    driver : boolean;
    max_km : number;
    over_fee : number,
    model : ModelResponse;
    delivery?: DeliveryResponse;
    user : UserResponse;
    utility_details : UtilityDetailResponse[];

}
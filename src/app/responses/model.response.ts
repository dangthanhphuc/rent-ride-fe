import { Fuel } from "../enums/fuel.enum";
import { Gearbox } from "../enums/grearbox.enum";
import { BrandResponse } from "./brand.response";
import { CategoryResponse } from "./category.response";

export interface ModelResponse {
    id : number;
    name : string;
    production_year : number;
    seats : number;
    fuel : Fuel;
    gearbox: Gearbox;
    brand : BrandResponse;
    category : CategoryResponse;
}
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { ResponseObject } from "../responses/api.response";

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    private readonly apiBaseUrl = `${environment.apiBaseUrl}/brands`;

    constructor(
        private http : HttpClient
    ){}


    brands$ = () : Observable<ResponseObject> => this.http.get<ResponseObject>(`${this.apiBaseUrl}`).pipe(
        catchError(this.handleError)
    )

    handleError(error : HttpErrorResponse) : Observable<never> {
        console.log(error);
        return throwError(`An error occurred: ${error.message}`);
    }

}
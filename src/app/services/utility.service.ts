import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { ResponseObject } from "../responses/api.response";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    private readonly apiBaseUrl = `${environment.apiBaseUrl}/utilities`;

    constructor(
        private http : HttpClient
    ){}

    utilities$ = this.http.get<ResponseObject>(`${this.apiBaseUrl}`)
    .pipe(
        catchError(this.handleError)
    )
    
    handleError(error : HttpErrorResponse) : Observable<never> {
        console.log(error);
        return throwError(`An error occurred: ${error.message}`);
      }
}
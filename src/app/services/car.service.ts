import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseObject } from '../responses/api.response';
import { environment } from '../environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/cars`;

  constructor(
    private http : HttpClient
  ) { 

  }


  getCars$ = <Observable<ResponseObject>> this.http.get<ResponseObject>(`${this.apiBaseUrl}`)
    .pipe(
      catchError(this.handleError)
    );
  
  

  handleError(error : HttpErrorResponse) : Observable<never> {
    console.log(error);
    return throwError(`An error occurred: ${error.message}`);
  }


}

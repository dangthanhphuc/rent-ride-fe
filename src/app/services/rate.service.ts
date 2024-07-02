import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseObject } from '../responses/api.response';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/rates`;

  constructor(
    private http : HttpClient
  ) { 

  }

  ratesByCarId$ = (id : number) => this.http.get<ResponseObject>(`${this.apiBaseUrl}/car_id/${id}`)
  .pipe(
    catchError(this.handleError)
  );



handleError(error : HttpErrorResponse) : Observable<never> {
  console.log(error);
  return throwError(`An error occurred: ${error.message}`);
}

}

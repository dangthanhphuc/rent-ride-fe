import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseObject } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/car_images`;

  constructor(
    private http : HttpClient
  ) { 

  }

  getImageFromCar$ = (carId : number) : Observable<ResponseObject> => 
    this.http.get<ResponseObject>(`${this.apiBaseUrl}/car_id/${carId}`).pipe(
      catchError(this.handleError)
    );

  handleError(error : HttpErrorResponse) : Observable<never> {
    console.log(error);
    return throwError(`An error occurred: ${error.message}`);
  }
}

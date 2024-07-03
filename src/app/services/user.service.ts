import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ResponseObject } from '../responses/api.response';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDTO } from '../dtos/login.dto';
import { UpdatePassDTO } from '../dtos/update.pass';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiBaseUrl = `${environment.apiBaseUrl}/users`;

  constructor(
    private http : HttpClient
  ) { 

  }

  
  register$ = (registerDTO : RegisterDTO) : Observable<ResponseObject> => this.http.post<ResponseObject>(`${this.apiBaseUrl}/register`, registerDTO).pipe(
    catchError(this.handleError)
  );

  login$ = (loginDTO : LoginDTO) : Observable<ResponseObject> =>
    this.http.post<ResponseObject>(`${this.apiBaseUrl}/login`, loginDTO).pipe(
      catchError(this.handleError)
    )

  resetPass$ = (id : number, updatePassDTO : UpdatePassDTO) : Observable<ResponseObject> => 
    this.http.put<ResponseObject>(`${this.apiBaseUrl}/resetPass/${id}`, updatePassDTO).pipe(
      catchError(this.handleError)
    )

  handleError(error : HttpErrorResponse) : Observable<never> {
    console.log(error);
    return throwError(`An error occurred: ${error.message}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, tap ,retry} from 'rxjs/operators';

import {  Observable, throwError } from 'rxjs';
import { Createuser } from '../modal/createuser';
import { Customer } from '../modal/customer';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  newEmployeeClicked = false;

  user:any;

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 data = JSON.parse(localStorage.getItem("acesscontroldata"));
  errorHandlerService: any=[];

  constructor(private httpClient: HttpClient) {
    

   }

  getAll(id): Observable<Createuser[]> {
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<Createuser[]>(this.apiServer + '/usermanagemet/allusers?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Createuser[], any> {
    console.log("this erfferfwer er",errorHandler)
    
// this.errorHandlerService=errorHandler;
//     console.log("this isfrom er",this.errorHandlerService.error.error)
    throw new Error(errorHandler);
 
  }

 handleError(error) {
    // if (error.error instanceof ErrorEvent) {
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // window.alert(errorMessage);
    return throwError(error);
  }



  create(user :Createuser,id): Observable<Createuser[]> {
console.log('this.id')
console.log(user)
    return this.httpClient.post<Createuser[]>(this.apiServer + '/usermanagemet/createuser?custId='+id,user, {responseType: 'text' as 'json' })
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


 
  getIpAddress(): Observable<Createuser[]> {
    console.log("cmg")
    return this.httpClient.get<Createuser[]>(this.apiServer + '/checkmqttIPaddress')
    .pipe(
      catchError(this.errorHandler)
    )
  }


  
  
  getUser(username): Observable<Createuser[]> {
    console.log(username)
    console.log("cmg")
    return this.httpClient.get<Createuser[]>(this.apiServer + '/usermanagemet/getuser?username='+ username)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateUserData(username, user): Observable<Createuser> {
    return this.httpClient.put<Createuser>(this.apiServer + '/usermanagemet/updateUser?username='+username, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  

  deleteUser(username: string): Observable<string> {
    return this.httpClient.delete<string>(this.apiServer + '/usermanagemet/deleteuser?username='+username,{responseType: 'text' as 'json' });
    }

    updateProfileData(id, customer): Observable<Customer> {
      console.log("this is customer id",id);
      console.log("this is customer object",customer)
      return this.httpClient.put<Customer>(this.apiServer + '/upadatsettings?id='+id, JSON.stringify(customer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }


    updateProfilePasswordData(id, updateCustomer): Observable<Customer> {
      console.log("this is customer id",id);
      console.log("this is customer object",updateCustomer)
      return this.httpClient.put<Customer>(this.apiServer + '/changepassword?id='+id, JSON.stringify(updateCustomer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }
  

  private _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return Observable.throw(error || 'Some Error on Server Occured');
}


customerLogout(logOutCustomer): Observable<Customer> {
  console.log('this is the customer logout object',logOutCustomer)
      return this.httpClient.post<Customer>(this.apiServer + '/customerlogout',logOutCustomer ,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }
  
    userLogout(logOutCustomer): Observable<Customer> {
      console.log('this is the customer logout object',logOutCustomer)
          return this.httpClient.post<Customer>(this.apiServer + '/userlogout',logOutCustomer ,this.httpOptions)
          .pipe(
            catchError(this.errorHandler)
          )
        }

}

import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { DoorDescription } from '../modal/door-description';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DoorDescriptionService {
  
  
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  doorDesc(siteid,doorDescription): Observable<string> {
    console.log('this.id')
    console.log("this is person",doorDescription)
        return this.httpClient.post<string>(this.apiServer + '/doordescription/create?siteid='+siteid,doorDescription, {responseType: 'text' as 'json' })
        .pipe(
          catchError(this.errorHandler)
        )
      }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<DoorDescription, any> {
    throw new Error('Internal Server Error.');
  }


  saveAll(siteid,tooTalSaveDoorDesc): Observable<string> {
 console.log("this is for object",tooTalSaveDoorDesc);
        return this.httpClient.post<string>(this.apiServer + '/doordescription/createall?siteid='+siteid,tooTalSaveDoorDesc, {responseType: 'text' as 'json' })
        .pipe(
          catchError(this.errorHandler)
        )
      }  




  getAllDoorDescription(siteid): Observable<DoorDescription[]> {
    console.log("cmg")
    return this.httpClient.get<DoorDescription[]>(this.apiServer + '/doordescription/all?siteid='+siteid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getDoorDesc(door): Observable<DoorDescription[]> {
    console.log("cmg")
    return this.httpClient.get<DoorDescription[]>(this.apiServer + '/doordescription/getdoordesc?door='+door)
      .pipe(
        catchError(this.errorHandler)
      )
  }

private handleError(errorResponse:HttpErrorResponse){
  if(errorResponse.error instanceof ErrorEvent){
    console.error('Client side error',errorResponse.error.message);
  } else{
    console.error('Server side Error: ',errorResponse);
  }

}

doorDescDelete(doorDescIdReference,siteid) {
  return this.httpClient.delete<string>(this.apiServer + '/doordescription/delete?doorDesId='+doorDescIdReference+'&siteid='+siteid, {responseType: 'text' as 'json' })
        .pipe(
          catchError(this.errorHandler)
        )
}


// doorDescAllDelete(tooTalDoorDesc,siteid): Observable<any> {
//   console.log("this is site id",siteid)
//   console.log("this is object",tooTalDoorDesc)
//   return this.httpClient.delete<any>(this.apiServer + '/doordescription/deleteall?siteid='+siteid,tooTalDoorDesc);
//   }
  

doorDescAllDelete(tooTalDoorDesc,siteid) {
  console.log("weufhwefbwefwe",tooTalDoorDesc);
  console.log("edfwefwefw",siteid);
  var reqHeader = new HttpHeaders({
          "Content-Type": "application/json",
      });
      const httpOptions = {
          headers: reqHeader,
          body: tooTalDoorDesc,
      };
  return this.httpClient.delete<any>(this.apiServer + '/doordescription/deleteall?siteid='+siteid, httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
  }

  

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { DoorManagement } from '../modal/door-management';

@Injectable({
  providedIn: 'root'
})
export class DoorManagementService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient:HttpClient) { }

  getAllDoorManagement(id): Observable<DoorManagement[]> {
    console.log("cmg")
    return this.httpClient.get<DoorManagement[]>(this.apiServer + '/doormanagement/getall?custid='+id)
    .pipe(
    catchError(this.errorHandler)
    )
    }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<DoorManagement[], any> {
    throw new Error('Method not implemented.');
  }



getSingleDoorManagement(doorid): Observable<DoorManagement[]> {
    console.log("cmg")
    return this.httpClient.get<DoorManagement[]>(this.apiServer + '/doormanagement/getsingledoor?doorid='+doorid)
    .pipe(
    catchError(this.errorHandler)
    )
    }

    
createDoorManagement( id,siteid,door) : Observable<DoorManagement> {
    console.log('this.id',id)
    
        return this.httpClient.post<DoorManagement>(this.apiServer + '/doormanagement/create?custid='+id+'&siteid='+siteid,door, {responseType: 'text' as 'json' })
        .pipe(
          catchError(this.errorHandler)
        )
      } 

 updateDoorManagement(doorid,door) : Observable<DoorManagement> {
        
            return this.httpClient.put<DoorManagement>(this.apiServer + '/doormanagement/update?doorid='+doorid,JSON.stringify(door),this.httpOptions)
            .pipe(
              catchError(this.errorHandler)
            )
          } 

          getAllDoorWithSite(id,siteid): Observable<DoorManagement[]> {
            console.log("cmg")
            return this.httpClient.get<DoorManagement[]>(this.apiServer + '/doormanagement/getallwithsite?custid='+id+'&siteid='+siteid)
            .pipe(
            catchError(this.errorHandler)
            )
            }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { EventLog } from '../modal/event-log';

@Injectable({
  providedIn: 'root'
})
export class EventLogsServiceService {
  private apiServer = environment.apiServer;

  constructor(private httpClient : HttpClient) { }


  getAll(customerid,userName): Observable<EventLog[]> {
    console.log("sjhfsdk",customerid)
    console.log("cmg",userName)
    return this.httpClient.get<EventLog[]>(this.apiServer + '/eventslogs/all?custid='+customerid+'&username='+userName)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getSingleEvent(loginid): Observable<EventLog> {
    console.log("cmg")
    return this.httpClient.get<EventLog>(this.apiServer + '/eventslogs/geteventslogs?loginid='+ loginid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<EventLog[], any> {
    throw new Error('Method not implemented.');
  }
 

  searchEventLogData(startDateReference,endDateReference): Observable<string> {
  console.log("sdcbcdcdcsd",startDateReference);
  console.log("45gregr",endDateReference);
  
    return this.httpClient.get<string>(this.apiServer + '/eventslogs/searchdate?startdate='+startDateReference+'&enddate='+endDateReference)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  showEventLogData(){  
   return this.httpClient.get<any>(this.apiServer + '/');    
  }  
}

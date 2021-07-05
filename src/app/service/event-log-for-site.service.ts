import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { EventLogForSite } from '../modal/event-log-for-site';

@Injectable({
  providedIn: 'root'
})
export class EventLogForSiteService {

  private apiServer = environment.apiServer;

  constructor(private httpClient : HttpClient) { }


  // getAll(): Observable<EventLogForSite[]> {
  //   console.log("sjhfsdk",)
  //   console.log("cmg")
  //   return this.httpClient.get<EventLogForSite[]>(this.apiServer + '/eventslogs/all')
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }


  // getSingleEventForSite(loginid): Observable<EventLogForSite> {
  //   console.log("cmg")
  //   return this.httpClient.get<EventLogForSite>(this.apiServer + '/eventslogs/geteventslogs?loginid='+ loginid)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  // errorHandler(errorHandler: any): import("rxjs").OperatorFunction<EventLogForSite[], any> {
  //   throw new Error('Method not implemented.');
  // }
 

  // searchEventLogForSiteData(startDateReference,endDateReference): Observable<string> {
  // console.log("sdcbcdcdcsd",startDateReference);
  // console.log("45gregr",endDateReference);
  
  //   return this.httpClient.get<string>(this.apiServer + '/eventslogs/searchdate?startdate='+startDateReference+'&enddate='+endDateReference)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }


  
}

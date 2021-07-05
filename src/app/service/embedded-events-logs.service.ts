import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmbeddedEventsLogs } from '../modal/embedded-events-logs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmbeddedEventsLogsService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getAll(deviceid): Observable<EmbeddedEventsLogs[]> {
    console.log("sjhfsdk",deviceid)
    console.log("cmg")
    return this.httpClient.get<EmbeddedEventsLogs[]>(this.apiServer + '/emeddedcontroller/allemebeddedlogs?deviceid='+ deviceid)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  searchEmbeeddedEventLogsServiceData(embeddedEventStartDateReference,embeddedEventEndDateReference): Observable<string> {
    console.log("sdcbcdcdcsd",embeddedEventStartDateReference);
    console.log("45gregr",embeddedEventEndDateReference);
    
      return this.httpClient.get<string>(this.apiServer + '/emeddedcontroller/searchdate?startdate='+embeddedEventStartDateReference+'&enddate='+embeddedEventEndDateReference)
        .pipe(
          catchError(this.errorHandler)
        )
    }
  

  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<EmbeddedEventsLogs[], any> {
    throw new Error('Method not implemented.');
  }
}

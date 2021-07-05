import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackTask } from '../modal/back-task';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BackTaskService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }


  getAll(deviceId): Observable<BackTask[]> {
    console.log("sjhfsdk",)
    console.log("cmg")
    return this.httpClient.get<BackTask[]>(this.apiServer + '/backtask/allbacktasklogs?deviceid='+ deviceId)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  searchBacktaskEventLogsServiceData(backTaskStartDateReference,backTaskEndDateReference): Observable<string> {
    console.log("sdcbcdcdcsd",backTaskStartDateReference);
    console.log("45gregr",backTaskEndDateReference);
    
      return this.httpClient.get<string>(this.apiServer + '/backtask/searchdate?startdate='+backTaskStartDateReference+'&enddate='+backTaskEndDateReference)
        .pipe(
          catchError(this.errorHandler)
        )
    }
  

  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<BackTask[],any> {
    throw new Error('Method not implemented.');
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroLogs } from '../modal/erro-logs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogsService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(deviceid): Observable<ErroLogs[]> {
    console.log("sjhfsdk",deviceid)
    console.log("cmg")
    return this.httpClient.get<ErroLogs[]>(this.apiServer + '/errorlogs/allerrorlogs?deviceid='+ deviceid)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  searchErrorLogsServiceData(startDateReference,endDateReference): Observable<string> {
    console.log("sdcbcdcdcsd",startDateReference);
    console.log("45gregr",endDateReference);
    
      return this.httpClient.get<string>(this.apiServer + '/errorlogs/searchdate?startdate='+startDateReference+'&enddate='+endDateReference)
        .pipe(
          catchError(this.errorHandler)
        )
    }
  
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<ErroLogs[], any> {
    throw new Error('Method not implemented.');
  }
}

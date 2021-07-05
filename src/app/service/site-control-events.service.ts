import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SiteControlEvents } from '../modal/site-control-events';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SiteControlEventsService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll(siteName): Observable<SiteControlEvents[]> {
    console.log("sjhfsdk",siteName)
    console.log("cmg")
    return this.httpClient.get<SiteControlEvents[]>(this.apiServer + '/sitecontrollereventslogs/allsitelogs?site='+ siteName)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  searchSiteControlEventLogsServiceData(startDateReference,endDateReference): Observable<string> {
    console.log("sdcbcdcdcsd",startDateReference);
    console.log("45gregr",endDateReference);
    
      return this.httpClient.get<string>(this.apiServer + '/sitecontrollereventslogs/searchdate?startdate='+startDateReference+'&enddate='+endDateReference)
        .pipe(
          catchError(this.errorHandler)
        )
    }
  

  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<SiteControlEvents[], any> {
    throw new Error('Method not implemented.');
  }
}

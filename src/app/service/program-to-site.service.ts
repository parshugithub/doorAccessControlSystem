import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgramToSite } from '../modal/program-to-site';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProgramToSiteService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
    constructor(private httpClient: HttpClient) { }
    create(): Observable<string> {
      // console.log(id);
   
      return this.httpClient.post<string>(this.apiServer + '/programtosite/create?custId=', {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
    }  
    errorHandler(errorHandler: any): import("rxjs").OperatorFunction<ProgramToSite[], any> {
  
      throw new Error('Method not implemented.');
   
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Engineer } from '../modal/engineer';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EngineerService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  

  create(engineer): Observable<Engineer[]> {
    console.log('this.id',engineer)
        return this.httpClient.post<Engineer[]>(this.apiServer + '/engineer/create',engineer, {responseType: 'text' as 'json' })
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
      }

      getEngineer(engId): Observable<Engineer[]> {
        console.log(engId)
        console.log("cmg")
        return this.httpClient.get<Engineer[]>(this.apiServer + '/engineer/getengineer?id='+ engId)
        .pipe(
          catchError(this.errorHandler)
        )
      }
    


  handleError(handleError: any): import("rxjs").OperatorFunction<Engineer[], Engineer[]> {
    throw new Error('Method not implemented.');
  }
    
  getAll(): Observable<Engineer[]> {
    console.log("cmg")
    return this.httpClient.get<Engineer[]>(this.apiServer + '/engineer/getallengineer')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Engineer[], any> {
    throw new Error('Method not implemented.');
  }
  updateEngineerData(engID, engineer): Observable<Engineer> {
    return this.httpClient.put<Engineer>(this.apiServer + '/engineer/update?id='+engID, JSON.stringify(engineer), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteEngineer(engID): Observable<string> {
    return this.httpClient.delete<string>(this.apiServer + '/engineer/delete?id='+engID,{responseType: 'text' as 'json' });
    }

}

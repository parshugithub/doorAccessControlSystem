import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonClass } from '../modal/person-class';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PersonClassService {

  constructor(private httpClient: HttpClient) { }

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  personClassPost(personClass,id,siteid,): Observable<string> {
    console.log("this is person class object",personClass);
    console.log("this is customer id",id);
    console.log("this is siteid",siteid);
    return this.httpClient.post<string>(this.apiServer + '/personclass/create?custId='+id+'&siteid='+siteid, personClass,{responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<string, any> {
    throw new Error('Method not implemented.');
  }

  getAll(id): Observable<PersonClass[]> {
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<PersonClass[]>(this.apiServer + '/personclass/getall?custid='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updatePersonClassData(personclassid, personClassUpdate): Observable<PersonClass> {
    console.log("this is personclassId",personclassid);
    console.log("this is person class obj",personClassUpdate);
    return this.httpClient.put<PersonClass>(this.apiServer + '/personclass/update?personclassid='+personclassid, JSON.stringify(personClassUpdate), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  getPersonClass(personclassid): Observable<PersonClass> {
    console.log(personclassid)
    console.log("cmg")
    return this.httpClient.get<PersonClass>(this.apiServer + '/personclass/details?personclassid='+ personclassid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deletePersonClass(personclassid): Observable<any> {
    return this.httpClient.delete<any>(this.apiServer + '/personclass/delete?personclassid='+personclassid,{responseType: 'text' as 'json' });
    }



}

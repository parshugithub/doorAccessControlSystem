import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonGroup } from '../modal/person-group';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PersonGroupService {

  constructor(private httpClient: HttpClient) { }

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  personGroupPost(personGroup,id,siteid,): Observable<string> {
    console.log("this is person class object",personGroup);
    console.log("this is customer id",id);
    console.log("this is siteid",siteid);
    return this.httpClient.post<string>(this.apiServer + '/persongroup/create?custId='+id+'&siteid='+siteid, personGroup,{responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<string, any> {
    throw new Error('Method not implemented.');
  }

  getAll(id): Observable<PersonGroup[]> {
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<PersonGroup[]>(this.apiServer + '/persongroup/getall?custid='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updatePersonGroupData(persongroupid, personGroupUpdate): Observable<PersonGroup> {
    return this.httpClient.put<PersonGroup>(this.apiServer + '/persongroup/update?persongroupid='+persongroupid, JSON.stringify(personGroupUpdate), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  gettingPersonGroup(persongroupid): Observable<PersonGroup> {
    console.log(persongroupid)
    console.log("cmg")
    return this.httpClient.get<PersonGroup>(this.apiServer + '/persongroup/details?persongroupid='+ persongroupid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deletePersonGroup(persongroupid): Observable<any> {
    return this.httpClient.delete<any>(this.apiServer + '/persongroup/delete?persongroupid='+persongroupid,{responseType: 'text' as 'json' });
    }


}

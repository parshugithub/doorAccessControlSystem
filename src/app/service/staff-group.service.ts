import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StaffGroup } from '../modal/staff-group';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StaffGroupService {


  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(staffGroup :StaffGroup,id): Observable<string> {
    console.log(id);
 
    return this.httpClient.post<string>(this.apiServer + '/staffmanagement/group/create?custId='+id,staffGroup, {responseType: 'text' as 'json' })
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<StaffGroup[], any> {

    throw new Error('Method not implemented.');
 
  }

  getAll(id): Observable<StaffGroup[]> {
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<StaffGroup[]>(this.apiServer + '/staffmanagement/group/allstaffgroup?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getStaffGroup(groupid): Observable<StaffGroup> {
    console.log(groupid)
    console.log("cmg")
    return this.httpClient.get<StaffGroup>(this.apiServer + '/staffmanagement/group/details?id='+ groupid)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  updateStaffGroupData(groupid,staffGroupUpdate,id): Observable<StaffGroup>
  {
    console.log("update reqest is ",staffGroupUpdate)
    return this.httpClient.put<StaffGroup>(this.apiServer + '/staffmanagement/group/update?id='+groupid+'&custid='+id, JSON.stringify(staffGroupUpdate), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  deleteStaffGroup(groupid): Observable<string> {
    console.log(groupid);
    return this.httpClient.delete<string>(this.apiServer + '/staffmanagement/group/delete?id='+groupid,{responseType: 'text' as 'json' })
 
  }


  
}

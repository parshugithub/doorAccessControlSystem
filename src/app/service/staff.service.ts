import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Staff } from '../modal/staff';
import { Site } from '../modal/sitemodal';
import { ScheduleMain } from '../modal/schedule-main';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  
 
  staff:any;
  id1:any;

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 
  constructor(private httpClient: HttpClient) { }

  getAll(id): Observable<Staff[]> {
    console.log("the staff group",this.staff)
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<Staff[]>(this.apiServer + '/staffManagement/staff/all?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
   // console.log("the staff group",this.staff)
  }

 
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Staff[], any> {
    throw new Error('Method not implemented.');
 
  }
  getSchedueles(id): Observable<ScheduleMain[]> {
   
    return this.httpClient.get<ScheduleMain[]>(this.apiServer + '/schedulemain/staffall/?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
   // console.log("the staff group",this.staff)
  }

  getScheduelesForSingle(scheduleidval: any):Observable<ScheduleMain> {
   
    return this.httpClient.get<ScheduleMain>(this.apiServer + '/schedulemain/getSchedule/?scheduleId='+ scheduleidval)
    .pipe(
      catchError(this.errorHandler)
    )
   // console.log("the staff group",this.staff)
  }
  create(staff :Staff,id): Observable<string> {
 
        return this.httpClient.post<string>(this.apiServer + '/staffManagement/staff/create?custId='+id,staff, {responseType: 'text' as 'json' })
        .pipe(
          catchError(this.errorHandler)
        )
      }  

      
  getStaff(staffid): Observable<Staff> {
    console.log(staffid)
    console.log("cmg")
    return this.httpClient.get<Staff>(this.apiServer + '/staffManagement/staff/details?staffid='+ staffid)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  updateStaffData(staffid,id, staff): Observable<Staff> {
    debugger;
    return this.httpClient.put<Staff>(this.apiServer + '/staffManagement/staff/update?staffid='+staffid+'&custId='+id, JSON.stringify(staff), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  deleteStaff(staffid: number): Observable<any> {
    return this.httpClient.delete<Staff>(this.apiServer + '/staffManagement/staff/delete?staffid='+staffid,{responseType: 'text' as 'json' });
  }


  getSite(sitename): Observable<Site[]> {
    console.log(sitename)
    console.log("cmg")
    return this.httpClient.get<Site[]>(this.apiServer + '/dashboard/getsite?sitename='+ sitename)
    .pipe(
      catchError(this.errorHandler)
    )
  }

}

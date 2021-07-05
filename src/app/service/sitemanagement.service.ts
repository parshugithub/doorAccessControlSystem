import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Site } from '../modal/sitemodal';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SitemanagementService {
  site:any;

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
    
  }
 // localstorage.getItem(storecustomerData)
 // localStorage.setItem("acesscontroldata",data);
 id = JSON.parse(localStorage.getItem("acesscontroldata"));

  constructor(private httpClient: HttpClient) {
    

   }
   //values = JSON.parse(localStorage.getItem("acesscontroldata"));

  getAll(id): Observable<Site[]> {
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<Site[]>(this.apiServer + '/dashboard/allsites?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Site[], any> {
    throw new Error('Method not implemented.');
 
  }

  send(mqtt): Observable<string> {
    console.log("this is mqtt object",mqtt)
    return this.httpClient.post<string>(this.apiServer +'/dashboard/mqtt/send', mqtt , {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }


  create(id,site): Observable<Site> {
    console.log("shdfjasdkfh",id)
 
        return this.httpClient.post<Site>(this.apiServer + '/dashboard/createsite?custId='+id,site, this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
      }  

      
        
  getSite(sitename): Observable<Site[]> {
    console.log(sitename)
    console.log("cmg")
    return this.httpClient.get<Site[]>(this.apiServer + '/dashboard/getsite?sitename='+ sitename)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  updateSiteData(sitename, site): Observable<Site> {
    return this.httpClient.put<Site>(this.apiServer + '/dashboard/updateSite?sitename='+sitename, JSON.stringify(site), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  deleteSite(sitename: string): Observable<any> {
    return this.httpClient.delete<Site>(this.apiServer + '/dashboard/deletesite?sitename='+sitename,{responseType: 'text' as 'json' });
  }
 

 
}

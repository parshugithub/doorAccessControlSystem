import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { SipSetting } from '../modal/sip-setting';

@Injectable({
  providedIn: 'root'
})
export class SipSettingService {
  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
    

  }

  getAllSipSettings(id): Observable<SipSetting[]> {
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<SipSetting[]>(this.apiServer + '/sipsetting/getall?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  createSipSetting(id, sipSetting): Observable<SipSetting> {
    console.log("this is the customer id",id);
    console.log("this is the sip setting create",sipSetting);
    
    return this.httpClient.post<SipSetting>(this.apiServer + '/sipsetting/create?custId=' + id , sipSetting, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  updateSipData(idRefer,id,updateSipObject): Observable<SipSetting> {
    console.log("this is the row id",idRefer);
    console.log("this is the cust id",id);
    console.log("this is the row id",updateSipObject);
    
    return this.httpClient.put<SipSetting>(this.apiServer + '/sipsetting/update?id='+idRefer+'&custid=' + id,updateSipObject,  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  deleteSip(sidIdRefer): Observable<any> {
    console.log("this is the delete sip",sidIdRefer);
    return this.httpClient.delete<any>(this.apiServer + '/sipsetting/delete?id='+sidIdRefer,{responseType: 'text' as 'json' });
  }
 

  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<SipSetting[], any> {
    throw new Error('Method not implemented.');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { VoiceOperatorForSite } from '../modal/voice-operator-for-site';


@Injectable({
  providedIn: 'root'
})
export class VoiceForSiteService {
  private apiServer = environment.apiServer;

  constructor(private httpClient: HttpClient) { }

  createVoiceForSite(custid, siteIdRefer,userid,voiceSiteObj): Observable<string> {
    console.log("this is cusrtomer id",custid);
    console.log("this is site id",siteIdRefer);
    console.log("this is user id",userid);
    console.log("this is voice operator object",voiceSiteObj);
    return this.httpClient.post<string>(this.apiServer + '/uservoiceoperator/create?custId='+custid +'&siteid=' + siteIdRefer+'&userid='+userid,voiceSiteObj,{responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(custid): Observable<VoiceOperatorForSite[]> {
    console.log("sjhfsdk",custid)
    console.log("cmg")
    return this.httpClient.get<VoiceOperatorForSite[]>(this.apiServer + '/uservoiceoperator/allvoice?custId='+ custid)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<string, any> {
    throw new Error('Method not implemented.');
  }
  




}

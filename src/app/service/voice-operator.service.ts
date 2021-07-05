import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VoiceOperator } from '../modal/voice-operator';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VoiceOperatorService {


  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  
  getAll(id): Observable<VoiceOperator[]> {
    console.log("sjhfsdk",id)
    console.log("cmg")
    return this.httpClient.get<VoiceOperator[]>(this.apiServer + '/voiceoperator/allvoice?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<VoiceOperator[], any> {
    throw new Error('Method not implemented.');
  }



  createVoice(voice: VoiceOperator, custid, siteid): Observable<string> {
    console.log("this is cusrtomer id",custid);
    console.log("this is site id",siteid);
    
    console.log("the channels object is ",voice)
    return this.httpClient.post<string>(this.apiServer + '/voiceoperator/create?custId='+custid +'&siteid=' + siteid,voice,{responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }


}

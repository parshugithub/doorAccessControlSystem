import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Accesslevel } from '../modal/accesslevel';
import { Channel } from '../modal/channel';
import { Door } from '../modal/door';
import { ScheduleDays } from '../modal/schedule-days';
import { ScheduleMain } from '../modal/schedule-main';
import { ScheduleDay } from '../modal/scheduledays';
import { Shedule } from '../modal/shedule';
import { StaffAccess } from '../modal/staff-access';
import { Tag } from '../modal/tag';
import { TradeCodesAndDoor } from '../modal/trade-codes-and-door';
import { TradeCodesWithDoor } from '../modal/trade-codes-with-door';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MoveToSiteService {
  
  user:any;
  dayval:any

  sheduleMain: any;
  staffAccess: any;
  constructor(private httpClient: HttpClient) { }

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  data = JSON.parse(localStorage.getItem("acesscontroldata"));

  convertHexa(value1: number) : Observable<Tag> 
  {
    console.log("asjdhakjs",value1)

    //return this.httpClient.get(this.apiServer + '/tag/getHexavaluesfor?tagrfid='+value).map((response) => response)

    return this.httpClient.get<Tag>(this.apiServer + '/tag/getHexavaluesfor?tagrfid='+value1,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  } 


  getDoor() :Observable<Door[]>{

    return this.httpClient.get<Door[]>(this.apiServer + '/doors/alldoor')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getSingleDoor(door: any) : Observable<Door> {
    console.log("the channels object is ",door)
    return this.httpClient.get<Door>(this.apiServer + '/doors/getdoor?door='+door, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getSingleDay(day) : Observable<ScheduleDays> {
    console.log("the day object is ",day)
    return this.httpClient.get<ScheduleDays>(this.apiServer + '/days/getday?day='+day, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllChannels(id,siteid): Observable<Channel[]> {
    console.log("this is customer id", id)
    return this.httpClient.get<Channel[]>(this.apiServer + '/channels/getChannels?custId=' + id +'&siteid='+siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }



  createChannels( id, siteid,channels): Observable<Channel> {
    console.log("this is cusrtomer id",id);
    console.log("this is site id",siteid);
    
    console.log("the channels object is ",channels)
    return this.httpClient.post<Channel>(this.apiServer + '/channels/create?custId='+id +'&siteid=' + siteid,channels, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createTag(tags: Tag, custid, siteid) : Observable<Tag> {
    return this.httpClient.post<Tag>(this.apiServer + '/tag/create?custId='+custid,tags, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  create(custid,siteid,scheduleIdReference,sheduleMain): Observable<ScheduleMain> {
    console.log("this is sch object",sheduleMain);
    console.log("this is site id",siteid);
    console.log("this is custid",custid);
    console.log("this is custid",scheduleIdReference);

    return this.httpClient.post<ScheduleMain>(this.apiServer + '/schedulemain/create?custId='+custid +'&siteid=' + siteid+'&scheduleid='+scheduleIdReference,sheduleMain, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getSingleForEmbeddedDoor(door: any,siteid:any) : Observable<any> {
    console.log("the channels object is ",door)
    return this.httpClient.get<any>(this.apiServer + '/doors/getdoorforembedded?door='+door+'&siteid=' + siteid, {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getDevice(door: any,siteid:any) : Observable<Door> {
    console.log("the channels object is ",door)
    return this.httpClient.get<Door>(this.apiServer + '/doors/getdoorforembedded?door='+door+'&siteid=' + siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  createStaffAccess(id, siteid,staffAccessAndOptionsId,staffAccess): Observable<string> {
    console.log("this is for customerid",id);
    console.log("this is for siteid",siteid);
    console.log("this is for staffAccessAndOptionsId",staffAccessAndOptionsId);
    console.log("this is for staffAccess",staffAccess);
    
    return this.httpClient.post<string>(this.apiServer + '/StaffAccess/create?custid='+id+'&siteid='+siteid+'&staff='+staffAccessAndOptionsId, staffAccess,{responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getAllSchedules(id,siteid): Observable<ScheduleMain[]> {
    console.log("cmg");
    console.log("customer id", id);
    return this.httpClient.get<ScheduleMain[]>(this.apiServer + '/schedulemain/all?custId='+id+'&siteid='+siteid)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getAllDays(): Observable<Shedule> {
    console.log("cmg")
    return this.httpClient.get<Shedule[]>(this.apiServer + '/schedules/alldays')
      .pipe(
        catchError(this.errorHandler)
      )
  }



  getAllHoures(): Observable<Shedule> {
    console.log("cmg")
    return this.httpClient.get<Shedule[]>(this.apiServer + '/schedules/allhours')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllMinutes(): Observable<Shedule> {
    console.log("cmg")
    return this.httpClient.get<Shedule[]>(this.apiServer + '/schedules/allminutes')
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getAccessLevels(): Observable<Accesslevel[]> {
    console.log("cmg")
    return this.httpClient.get<Accesslevel[]>(this.apiServer + '/accesslevels/getall')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllStaffAccessAndOptions(id,siteid): Observable<StaffAccess[]> {
    console.log("this is customer id", id)
    return this.httpClient.get<StaffAccess[]>(this.apiServer + '/StaffAccess/getall?custid='+id+'&siteid='+siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getAllTradeCodes(id,siteid): Observable<TradeCodesAndDoor[]> {
    console.log("this is customer id", id)
    return this.httpClient.get<TradeCodesAndDoor[]>(this.apiServer + '/tradecodeanddoor/getTrades?custid='+id+'&siteid='+siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllTradewithDoor(id,siteid): Observable<TradeCodesWithDoor[]> {
    console.log("this is customer id", id)
    return this.httpClient.get<TradeCodesWithDoor[]>(this.apiServer + '/tradedoor/getall?custid='+id+'&siteid='+siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }




  createEnable( id,siteid,enableDateAndTimeObj): Observable<StaffAccess> {
    return this.httpClient.post<StaffAccess>(this.apiServer + '/EnableDateAndTime/create?custid=' + id + '&siteid=' + siteid, enableDateAndTimeObj, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }



  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Shedule[], ScheduleDay> {
    throw new Error('Method not implemented.');
  }
  

  createTradeAndDoor(id, siteid,tradeid,tradeCodesAndDoorObj): Observable<TradeCodesAndDoor> {
    return this.httpClient.post<TradeCodesAndDoor>(this.apiServer + '/tradecodeanddoor/createTrade?custid=' + id + '&siteid=' + siteid + '&tradeid=' +tradeid, tradeCodesAndDoorObj, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createTradeWithDoor(id, siteid,tradeDoorId,tradeCodesWithDoorObj): Observable<string> {
    console.log("this is site id",siteid);
    console.log("this is customer id",siteid);
    console.log("this is tradecodewithdoorobj id",tradeCodesWithDoorObj);
    
    return this.httpClient.post<string>(this.apiServer + '/tradedoor/create?custid=' + id + '&siteid=' + siteid+'&tradedoorid='+tradeDoorId, tradeCodesWithDoorObj, {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }


}



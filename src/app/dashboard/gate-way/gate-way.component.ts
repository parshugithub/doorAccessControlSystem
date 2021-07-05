import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BackTask } from 'src/app/modal/back-task';
import { EmbeddedEventsLogs } from 'src/app/modal/embedded-events-logs';
import { ErroLogs } from 'src/app/modal/erro-logs';
import { SiteControlEvents } from 'src/app/modal/site-control-events';
import { BackTaskService } from 'src/app/service/back-task.service';
import { EmbeddedEventsLogsService } from 'src/app/service/embedded-events-logs.service';
import { ErrorLogsService } from 'src/app/service/error-logs.service';
import { SiteControlEventsService } from 'src/app/service/site-control-events.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-gate-way',
  templateUrl: './gate-way.component.html',
  styleUrls: ['./gate-way.component.scss']
})
export class GateWayComponent implements OnInit {
  startdate:any;
  enddate:any;
  endDateReference:any;
  startDateReference:any;
  sitecontrolStartDateReference:any;
  sitecontrolEndDateReference:any;

  backTaskStartDateReference:any;
  backTaskEndDateReference:any;

  embeddedEventStartDateReference:any;
  embeddedEventEndDateReference:any;
  errorLogsmodel : any={};    
  siteControlLogsmodel : any={};    
  backTaskmodel : any={};    
  embeeddedControlmodel : any={};    

  currentPage = 1;
  currentBacktaskPage=1;
  currentEmbeeddedPage=1;
  currentSitePage=1;
  itemsPerPage = 5;
  backtaskPerPage=4;
  embeedPerPage=5;
  sitePerPage=5;
  totalItems: any;
  totalBackTasks:any;
  maxSize = 5;
  myDateValue: Date;
  backDate: Date;
  embedDate: Date;
  siteControlDate: Date;
taskId:any;
  toDate:Date;
  backToDate:Date;
  embedToDate:Date;
  siteToDate:Date;
  searchText;

  duplicateArray=[]
  backTaskArray=[]
  embeeddedArray=[]
  siteControllArray=[]
  ErroLogsresult:ErroLogs[] = [];
  backtaskresult:BackTask[]=[];
  sitecontrollerResult:SiteControlEvents[]=[];
  embeddedControllerResult:EmbeddedEventsLogs[]=[];
  constructor(private router: Router, public userService: UserService,public datepipe: DatePipe,private route: ActivatedRoute,private errorLogsServie: ErrorLogsService,private backTaskServie:BackTaskService,private embeddedEventsLogsServie:EmbeddedEventsLogsService,private siteControlEventsServie:SiteControlEventsService) { }

  ngOnInit(): void {
    this.gettingErrorLogs();
    this.gettingEmbeddedLogs();
    this.gettingBackTask();
    this.gettingSiteControlEvents();
    let siteid = this.route.snapshot.paramMap.get('siteid');
    console.log("site id is",siteid);
    let deviceId = this.route.snapshot.paramMap.get('deviceId');
    console.log("site deviceid is",deviceId);
    this.myDateValue = new Date("12-08-2019");
    this.backDate = new Date("12-09-2019");
     this.embedDate=new Date("12-10-2019");
     this.siteControlDate=new Date("12-11-2019")
   // this.duplicateArray=this.ErroLogsresult
   // this.backTaskArray=this.backtaskresult
    //this.embeeddedArray=this.embeddedControllerResult
    this.siteControllArray=this.sitecontrollerResult
     
  }
// filterDate(){
  //   let fromdate=moment(this.myDateValue).format('DD-MM-YYYY');
  //   console.log(fromdate)
  //   let todate=moment(this.toDate).format('DD-MM-YYYY');
  //   this.array.filter(
  //   m => new Date(m.fromDate) >= new Date(fromdate) && new Date(m.fromDate) <= new Date(todate));
  //   console.log(this.array)
  // }
  pageChanged(event:any) {
   this.currentPage = event.page;
}
pageBacktaskChanged(event:any) {
  this.currentBacktaskPage = event.page;
}
pageEmbeeddedControl(event:any){
  this.currentEmbeeddedPage=event.page;
}
pageSiteControl(event:any){
  this.currentSitePage=event.page;
}
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  reverseAndTimeStamp(dateString) {
    const reverse = new Date(dateString.split("-").reverse().join("-"));
    return reverse.getTime();
    }
filterDate() {
    let fromdate=moment(this.myDateValue).format('DD-MM-YYYY');
console.log(fromdate)
let todate=moment(this.toDate).format('DD-MM-YYYY');
if(this.myDateValue && this.toDate){
const selectedMembers = this.ErroLogsresult.filter(m => {
        return this.reverseAndTimeStamp(m.dateAndTime) >= this.reverseAndTimeStamp(fromdate) && this.reverseAndTimeStamp(m.dateAndTime) <= this.reverseAndTimeStamp(todate)
    }
    );
    this.duplicateArray=selectedMembers
}else{
this.duplicateArray=this.ErroLogsresult
}
    
    console.log(this.duplicateArray); // the result objects
}



onDateBackChange(newDate: Date) {
  console.log(newDate);
}
reverseAndBackTimeStamp(dateString) {
  const reverse = new Date(dateString.split("-").reverse().join("-"));
  return reverse.getTime();
  }


filterBackDate() {
  let fromdate=moment(this.backDate).format('DD-MM-YYYY');
console.log(fromdate)
let todateback=moment(this.backToDate).format('DD-MM-YYYY');
if(this.backDate && this.backToDate){
const selectedBackMembers = this.backtaskresult.filter(m => {
      return this.reverseAndBackTimeStamp(m.dateAndTime) >= this.reverseAndBackTimeStamp(fromdate) && this.reverseAndBackTimeStamp(m.dateAndTime) <= this.reverseAndBackTimeStamp(todateback)
  }
  );
  this.backTaskArray=selectedBackMembers
}else{
this.backTaskArray=this.backtaskresult
}
  
  console.log(this.backTaskArray); // the result objects
}


filterEmbeeddedDate() {
  let fromdate=moment(this.embedDate).format('DD-MM-YYYY');
console.log(fromdate)
let toembeeddate=moment(this.embedToDate).format('DD-MM-YYYY');
if(this.embedDate && this.embedToDate){
const selectedBackMembers = this.embeddedControllerResult.filter(m => {
      return this.reverseAndBackTimeStamp(m.dateAndTime) >= this.reverseAndBackTimeStamp(m.dateAndTime) && this.reverseAndBackTimeStamp(m.dateAndTime) <= this.reverseAndBackTimeStamp(m.dateAndTime)
  }
  );
  this.embeeddedArray=selectedBackMembers
}else{
this.embeeddedArray=this.embeddedControllerResult
}
  
  console.log(this.embeeddedArray); // the result objects
}


filterSiteControlDate() {
  let fromdate=moment(this.siteControlDate).format('DD-MM-YYYY');
console.log(fromdate)
let tositedate=moment(this.siteToDate).format('DD-MM-YYYY');
if(this.siteControlDate && this.siteToDate){
const selectedSiteMembers = this.sitecontrollerResult.filter(m => {
      return this.reverseAndBackTimeStamp(m.dateAndTime) >= this.reverseAndBackTimeStamp(fromdate) && this.reverseAndBackTimeStamp(m.dateAndTime) <= this.reverseAndBackTimeStamp(tositedate)
  }
  );
  this.siteControllArray=selectedSiteMembers
}else{
this.siteControllArray=this.sitecontrollerResult
}
  
  console.log(this.siteControllArray); // the result objects
}


  
goToSite(){
  this.router.navigate(['dashboard']);

}


gettingErrorLogs(){
  let deviceId = this.route.snapshot.paramMap.get('deviceId');
  console.log("this is deviceid is",deviceId);

  this.errorLogsServie.getAll(deviceId).subscribe((ErroLogs) => {
        console.log("this is all errorlogs",ErroLogs);
        this.ErroLogsresult=ErroLogs;
        // this.duplicateArray=this.ErroLogsresult
        // this.array = data;
        // console.log("all staff groups", this.staffGroupArray);
      })

}
gettingEmbeddedLogs(){
  let deviceId = this.route.snapshot.paramMap.get('deviceId');
  console.log("this is deviceid is",deviceId);

  this.embeddedEventsLogsServie.getAll(deviceId).subscribe((EmbeddedLogsData: EmbeddedEventsLogs[]) => {
        console.log("this is all embedded Events Logs",EmbeddedLogsData);
        this.embeddedControllerResult=EmbeddedLogsData;
        // this.embeeddedArray=this.embeddedControllerResult;
        // this.array = data;
        // console.log("all staff groups", this.staffGroupArray);
      })

}

gettingBackTask(){
  // let deviceId = this.route.snapshot.paramMap.get('deviceId');
  let deviceId = this.route.snapshot.paramMap.get('deviceId');
  this.backTaskServie.getAll(deviceId).subscribe((backTasks: BackTask[]) => {
   this.backtaskresult=backTasks;
  //  this.backTaskArray=this.backtaskresult;
    console.log("this is all back Tasks",backTasks);
    // this.array = data;
    // console.log("all staff groups", this.staffGroupArray);
  })

}

gettingSiteControlEvents(){
  let deviceId = this.route.snapshot.paramMap.get('deviceId');

  console.log("this is deviceName is",deviceId);

  this.siteControlEventsServie.getAll(deviceId).subscribe((siteControlData: SiteControlEvents[]) => 
  {
        console.log("this is all siteControlData Events Logs",siteControlData);
        this.sitecontrollerResult=siteControlData;
        this.siteControllArray=this.sitecontrollerResult;
        // this.array = data;
        // console.log("all staff groups", this.staffGroupArray);
      })
}



searchErrorLogsData() {  
  this.startdate= (<HTMLInputElement>document.getElementById("startDate")).value
  this.enddate= (<HTMLInputElement>document.getElementById("endDate")).value
  this.startDateReference = this.datepipe.transform(this.startdate, 'MM-dd-yyy');
  console.log("this is for search startdate refrence values",this.startDateReference);
this.endDateReference=this.datepipe.transform(this.enddate, 'MM-dd-yyy');
console.log("this is for search end date refrence values",this.endDateReference);
  this.errorLogsServie.searchErrorLogsServiceData( this.startDateReference,this.endDateReference).subscribe((res: any) => {  
    this.ErroLogsresult=res;   
  })  
}  

searchSitecontroleventLogsData() {  
  let startdate= (<HTMLInputElement>document.getElementById("startDate1")).value
  let enddate= (<HTMLInputElement>document.getElementById("endDate1")).value
  this.sitecontrolStartDateReference = this.datepipe.transform(startdate, 'MM-dd-yyy');
  console.log("this is for search startdate refrence values",this.startDateReference);
this.sitecontrolEndDateReference=this.datepipe.transform(enddate, 'MM-dd-yyy');
console.log("this is for search end date refrence values",this.endDateReference);
  this.siteControlEventsServie.searchSiteControlEventLogsServiceData( this.sitecontrolStartDateReference,this.sitecontrolEndDateReference).subscribe((res: any) => {  
    this.sitecontrollerResult=res;   
  })  
}  

searchBackTaskeventLogsData() {  
  let startdate= (<HTMLInputElement>document.getElementById("startDate")).value
  let enddate= (<HTMLInputElement>document.getElementById("endDate")).value
  this.backTaskStartDateReference = this.datepipe.transform(startdate, 'MM-dd-yyy');
  console.log("this is for search startdate refrence values",this.startDateReference);
this.backTaskEndDateReference=this.datepipe.transform(enddate, 'MM-dd-yyy');
console.log("this is for search end date refrence values",this.endDateReference);
  this.backTaskServie.searchBacktaskEventLogsServiceData( this.backTaskStartDateReference,this.backTaskEndDateReference).subscribe((res: any) => {  
    this.backtaskresult=res;   
  })  
}  


searchEmbeedddeventLogsData() {  
  let startdate= (<HTMLInputElement>document.getElementById("startDate")).value
  let enddate= (<HTMLInputElement>document.getElementById("endDate")).value
  this.embeddedEventStartDateReference = this.datepipe.transform(startdate, 'MM-dd-yyy');
  console.log("this is for search startdate refrence values",this.startDateReference);
this.embeddedEventEndDateReference=this.datepipe.transform(enddate, 'MM-dd-yyy');
console.log("this is for search end date refrence values",this.endDateReference);
  this.siteControlEventsServie.searchSiteControlEventLogsServiceData( this.embeddedEventStartDateReference,this.embeddedEventEndDateReference).subscribe((res: any) => {  
    this.embeddedControllerResult=res;   
  })  
}  

goReturn(){
  let sitename = this.route.snapshot.paramMap.get('siteName');

  this.router.navigate(['dashboard/view-site',sitename]);

}



}

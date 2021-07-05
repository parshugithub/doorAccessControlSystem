import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventLogForSite } from 'src/app/modal/event-log-for-site';

@Component({
  selector: 'app-event-log-for-site',
  templateUrl: './event-log-for-site.component.html',
  styleUrls: ['./event-log-for-site.component.scss']
})
export class EventLogForSiteComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 5;
  searchText;
  siteid:any;
  startDateReference:any;
  endDateReference:any;
  page = 1;
  pageSize =5;
  startdate:any;
  enddate:any;
   model : any={};    
  eventLogForSiteInfo: EventLogForSite[] = [];

  constructor(public datepipe: DatePipe,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.siteid = this.route.snapshot.params['siteid'];
console.log("this is for siteid",this.siteid)
    this.eventLogForSiteInfo=this.eventLogForSite;
    console.log("this is for events log for site",this.eventLogForSiteInfo)
  }

  public eventLogForSite=[
    // {
    //   "id": 1,
    //   "event": "RetrieveFromSite",
    //   "status": "Successful",
    //   "Description": "2021-02-19 06:21:56",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-19-2021"

    // },
    // {
    //   "id": 2,
    //   "event": "ProgramToSite",
    //   "status": "Failure",
    //   "Description": "TradeCodeIndex:1, PassNumber:123456, ScheduleIndex:1	",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-17-2021"

    // },
    // {
    //   "id": 3,
    //   "event": "RetrieveFromSite",
    //   "status": "Failure",
    //   "Description": "2021-02-19 06:21:56",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-10-2021"

    // },
    // {
    //   "id": 4,
    //   "event": "ProgramToSite",
    //   "status": "Failure",
    //   "Description": "2021-02-19 06:21:56",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-13-2021"

    // },
    // {
    //   "id": 5,
    //   "event": "ProgramToSite",
    //   "status": "Failure",
    //   "Description": "Object reference not set to an instance of an object.	",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-11-2021"

    // },
    // {
    //   "id": 6,
    //   "event": "ProgramToSite",
    //   "status": "Failure",
    //   "Description": "Object reference not set to an instance of an object.	",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-13-2021"

    // },
    // {
    //   "id": 7,
    //   "event": "ProgramToSite",
    //   "status": "Failure",
    //   "Description": "Object reference not set to an instance of an object.	",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-19-2021"

    // },
    // {
    //   "id": 8,
    //   "event": "RetrieveFromSite",
    //   "status": "Successful",
    //   "Description": "Object reference not set to an instance of an object.	",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-10-2021"

    // },
    // {
    //   "id": 9,
    //   "event": "RetrieveFromSite",
    //   "status": "Successful",
    //   "Description": "2021-02-19 06:21:56",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-19-2021"

    // },
    // {
    //   "id": 10,
    //   "event": "RetrieveFromSite",
    //   "status": "Successful",
    //   "Description": "2021-02-19 06:21:56",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-12-2021"

    // },
    // {
    //   "id": 11,
    //   "event": "RetrieveFromSite",
    //   "status": "Successful",
    //   "Description": "2021-02-19 06:21:56",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-13-2021"

    // },
    // {
    //   "id": 12,
    //   "event": "RetrieveFromSite",
    //   "status": "Failure",
    //   "Description": "19-02-2021 07:21:47",
    //   "eventDescription": "ergre",
    //   "dateUpdated": "2-14-2021	"

    // }
  ]





// gettingAllEventsForSites(){
//   this.searchEventLogdataService.getAll().subscribe((eventlogListResponse: EventLogForSite[])=>{
//     console.log("this is the event log for site response",eventlogListResponse);
//     this.eventLogForSiteInfo = eventlogListResponse;
//     console.log("this is the event log appended response", this.eventLogForSiteInfo);
//   }
//   ) 
// }



   searchEventForSite() {  
//     this.startdate= (<HTMLInputElement>document.getElementById("startDate")).value
//     this.enddate= (<HTMLInputElement>document.getElementById("endDate")).value
//     this.startDateReference = this.datepipe.transform(this.startdate, 'MM-dd-yyy');
//     console.log("this is for search startdate refrence values",this.startDateReference);
// this.endDateReference=this.datepipe.transform(this.enddate, 'MM-dd-yyy');
// console.log("this is for search end date refrence values",this.endDateReference);
//     this.searchEventLogdataService.searchEventLogData( this.startDateReference,this.endDateReference).subscribe((res: any) => {  
//       this.eventLogsInfo=res;   
//     })  
   }  

goToDetailEventLogForSite(id){
  this.router.navigate(['dashboard/detailed-eventlog-filter',this.siteid,id]);
}
pageChanged(event:any) {
  this.currentPage = event.page;
}
searchEventData(){
  
}



}

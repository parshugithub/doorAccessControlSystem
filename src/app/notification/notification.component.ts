import { Component, OnInit } from '@angular/core';
import { Createuser } from '../modal/createuser';
import { EventLog } from '../modal/event-log';
import { DatePipe } from '@angular/common';
import { UserService } from '../service/user.service';
import { EventLogsServiceService } from '../service/event-logs-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  eventLogsInfo: EventLog[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  startdate:any;
  enddate:any;
  count=1;
  startDateReference:any;
  endDateReference:any;
  accessingData:any;
  model : any={};    
  searchText;
  page = 1;
  pageSize =5;

  constructor(public userService: UserService,private searchEventLogdataService:EventLogsServiceService,public datepipe: DatePipe) { }

  ngOnInit(): void { this.gettingEventData();
    this.userService.getIpAddress().subscribe((IPAddress: Createuser[])=>{     
      console.log("this is the response for ip address active or not",IPAddress);
    })
  }
  gettingEventData() {
    // throw new Error('Method not implemented.');
  }
  searchEventData() {  
    this.startdate= (<HTMLInputElement>document.getElementById("startDate")).value
    this.enddate= (<HTMLInputElement>document.getElementById("endDate")).value
    this.startDateReference = this.datepipe.transform(this.startdate, 'MM-dd-yyy');
    console.log("this is for search startdate refrence values",this.startDateReference);
this.endDateReference=this.datepipe.transform(this.enddate, 'MM-dd-yyy');
console.log("this is for search end date refrence values",this.endDateReference);
    this.searchEventLogdataService.searchEventLogData( this.startDateReference,this.endDateReference).subscribe((res: any) => {  
      this.eventLogsInfo=res;   
    })  
  } 
  pageChanged(event:any) {
    this.currentPage = event.page;
 }
}

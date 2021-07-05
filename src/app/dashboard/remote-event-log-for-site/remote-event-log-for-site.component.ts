import { Component, OnInit } from '@angular/core';
import { RemoteEventLogForSite } from 'src/app/modal/remote-event-log-for-site';

@Component({
  selector: 'app-remote-event-log-for-site',
  templateUrl: './remote-event-log-for-site.component.html',
  styleUrls: ['./remote-event-log-for-site.component.scss']
})
export class RemoteEventLogForSiteComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 5;
  model : any={};    
  searchText;

  constructor() { }
  remoteEventLogForSiteInfo: RemoteEventLogForSite[] = [];

  ngOnInit(): void {
    this.remoteEventLogForSiteInfo=this.remoteEventLogForSite;
  }
 


  public remoteEventLogForSite=[
    // {
    //   "id":1,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":2,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":3,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":4,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":5,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":6,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":7,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":8,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":9,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":10,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":11,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // },
    // {
    //   "id":12,
    //   "eventNumber":"00",
    //   "dateEvent":"17/11/2020 13:49:44",
    //   "eventType":"17/11/2020 13:49:44",
    //   "eventDescription":"Door Open via PC",
    //   "eventInfoCode":"00",
    //   "eventInfoCodeDescription":"edcwcwececwe",
    //   "dateEventRetrieved":"2-17-2021"

    // }
  ]

  searchRemoteEventForSite(){

  }

  pageChanged(event:any) {
    this.currentPage = event.page;
  }
  
  searchEventData(){
    
  }


}

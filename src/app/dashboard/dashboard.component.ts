import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';

import { Site } from '../modal/sitemodal';
import { SitemanagementService } from '../service/sitemanagement.service';
import { RegistrationService } from '../service/registration.service';
import { catchError, filter, retry } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Createuser } from '../modal/createuser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
searchText;
  confirmation:boolean = true;

  msg='';
count=1;
  site: Site[] = [];
  toggleProBanner(event) {
    console.log("123");
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }

  constructor(public siteManagementservice:SitemanagementService, public userService: UserService,private _router: Router,public _service:RegistrationService,private toaster:ToastrService) { }
customerResponce;
  response;
 items;
 siteList:any;
 mqtt=new Site();
 ngOnInit(): void {
   
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
     console.log(data);
      console.log("The customer response ",data)
      console.log("The id is",data.id);
       console.log("list of the values",this.count);
  this.allSites();
 
  }


allSites(){
  let data = JSON.parse(localStorage.getItem("acesscontroldata"));

  this.siteManagementservice.getAll(data.id).subscribe((siteListResponse: Site[])=>{
    console.log(siteListResponse);
    this.site = siteListResponse;
    var totalength=siteListResponse.length;
    console.log(totalength);
    for(this.siteList=1;this.siteList<=totalength;this.siteList++){
      this.count++;
    }
    console.log(this.count);
  }) 
  window.localStorage.removeItem('forgotData');
}

reloadDashboard(){
  window.location.reload();

}


  goToSite(siteid){
    this._router.navigate(['Site',siteid]);
  }


  goToPersons(siteid){
    this._router.navigate(['persons',siteid]);

  }
  goToSiteOpenDoor(siteid){
    this._router.navigate(['dashboard/openDoor',siteid]);
  }
  goToVoice(siteid){
    this._router.navigate(['dashboard/VoiceOperators',siteid]);

  }

  goToDoorDescription(siteid){
    this._router.navigate(['dashboard/doorDescription',siteid]);

  }

  goToEventLogFilter(siteid){
    this._router.navigate(['dashboard/eventlog-filter',siteid]);
  }
goToRemoteEventLog(siteid){
  this._router.navigate(['dashboard/remote-eventlog',siteid]);

}
  goToSiteGateWay(siteid,deviceId,siteName){
    this._router.navigate(['dashboard/gateway',siteid,deviceId,siteName]);
  }

  goToMqtt(siteid,deviceId,siteName){
    console.log("this is siteid for  mqtt  ",siteid)
    console.log("this is deviceid for mqtt ",deviceId)
    console.log("this is sitename for mqtt ",siteName)
    this.mqtt.siteid=siteid
    this.mqtt.deviceId=deviceId
    this.mqtt.siteName=siteName
  console.log("this is for sending for mqtt",this.mqtt)
    this.siteManagementservice.send(this.mqtt).subscribe(
      (res) => {
        console.log(res);
        // this.msg='Retrieving Date and time';
        this.toaster.success(res);
      },
      error => {
        
        this.toaster.error(error);

      })
  }


  update(sitename){
    console.log(sitename)
    this._router.navigate(['dashboard/updateSite',sitename]);

  }

  viewSite(sitename){
    console.log(sitename)
    this._router.navigate(['dashboard/view-site',sitename]);

  }


 


 
deleteSiteCalling(sitename){
  console.log("about to delete site - "+sitename);
  
  this.confirmation=confirm("Are you sure to delete "+sitename)
  
  if(this.confirmation==true)
  {
  console.log("true cmg");
  this.siteManagementservice.deleteSite(sitename)
  .subscribe((res)=>{
  this.msg="site deleted Successfully"
  this.toaster.success(this.msg);
  
  this.allSites();
  
  });
  }
  else{
  console.log("false user cancelled");
  
  }
  }
  
  date: Date = new Date();

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'USA',
    data: [40, 30, 20, 10, 50, 15, 35, 40],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'UK',
    data: [70, 10, 30, 40, 25, 50, 15, 30],
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 20,
                max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
        }],
        xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
            },
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

}

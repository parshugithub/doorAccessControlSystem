import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/modal/sitemodal';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';

@Component({
  selector: 'app-view-site-info',
  templateUrl: './view-site-info.component.html',
  styleUrls: ['./view-site-info.component.scss']
})
export class ViewSiteInfoComponent implements OnInit {
  confirmation:boolean = true;
  msg='';
  mqtt=new Site();

  sitename: string;
  site = new Site();
  siteArray: Site[] = [];
siteObject:any;
   constructor(private route: ActivatedRoute,private toaster:ToastrService,public siteManagementservice:SitemanagementService, private router: Router, public siteService:SitemanagementService) { }

  ngOnInit(): void {
    this.sitename = this.route.snapshot.params['sitename'];
    
    this.siteService.getSite(this.sitename)
      .subscribe(data => {
        console.log("getting site", data);
        localStorage.setItem("siteInfo", JSON.stringify(data));

        this.siteObject=data;
        this.siteArray.push(this.siteObject);
        console.log("getting site",   this.siteArray);
        this.siteArray.forEach(element => {
          this.mqtt.siteid=element.siteid;
          this.mqtt.deviceId=element.deviceId;
          this.mqtt.siteName=element.siteName;
        console.log("this is for sending for mqtt",this.mqtt)
          this.siteManagementservice.send(this.mqtt).subscribe(
            (res) => {
            
              element.connectivity = res.includes('Offline')?'Offline':'Online';
              element.imageUrl = element.connectivity === 'Offline' ? "/assets/images/connectivity/redDot.jpg" :  "/assets/images/connectivity/greendot.jpg";
            },
            error => {
              
              this.toaster.error(error);
      
            })
});
      }, error => console.log(error));
  }
  update(){
    console.log(this.sitename)
    this.router.navigate(['dashboard/updateSite',this.sitename]);

  }


  
  deleteSiteCalling(){
    // console.log("about to delete site - "+sitename);
    
    this.confirmation=confirm("Are you sure to delete "+this.sitename)
    
    if(this.confirmation==true)
    {
    console.log("true cmg");
    this.siteManagementservice.deleteSite(this.sitename)
    .subscribe((res)=>{
    this.msg="site deleted Successfully"
    this.toaster.success(this.msg);
    this.router.navigate(['dashboard']);

    
    });
    }
    else{
    console.log("false user cancelled");
    
    }
    }
    goToEventLogFilter(siteid){
      this.router.navigate(['dashboard/eventlog-filter',siteid]);
    }
  goToRemoteEventLog(siteid){
    this.router.navigate(['dashboard/remote-eventlog',siteid]);
  
  }
    goToSiteGateWay(siteid,deviceId,siteName){
      this.router.navigate(['dashboard/gateway',siteid,deviceId,siteName]);
    }
    goToSiteOpenDoor(){
    
      this.router.navigate(['dashboard/openDoor',this.siteObject.siteid]);
    }
    
  goToSite(){
    this.router.navigate(['dashboard/Site',this.siteObject.siteid]);
  }


  goToMqtt(){
    console.log("this is siteid for  mqtt  ",this.siteObject.siteid)
    console.log("this is deviceid for mqtt ",this.siteObject.deviceId)
    console.log("this is sitename for mqtt ",this.siteObject.siteName)
    this.mqtt.siteid=this.siteObject.siteid;
    this.mqtt.deviceId=this.siteObject.deviceId;
    this.mqtt.siteName=this.siteObject.siteName;
  console.log("this is for sending for mqtt",this.mqtt)
    this.siteManagementservice.send(this.mqtt).subscribe(
      (res) => {
        console.log(res);
        // this.msg='Retrieving Date and time';
        this.toaster.error(res);
      },
      error => {
        
        this.toaster.error(error);

      })
  }


    goToDoorDescription(){
      console.log("thiis is the site id",this.siteObject.siteid)
      this.router.navigate(['dashboard/doorDescription',this.siteObject.siteid]);
  
    }
    goToVoice(){
      this.router.navigate(['dashboard/VoiceOperators',this.siteObject.siteid]);
  
    }
    goToPersons(){
      this.router.navigate(['dashboard/persons',this.siteObject.siteid]);
  
    }
    



}

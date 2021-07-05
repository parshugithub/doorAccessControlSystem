import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Createuser } from 'src/app/modal/createuser';
import { Site } from 'src/app/modal/sitemodal';
import { VoiceOperatorForSite } from 'src/app/modal/voice-operator-for-site';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { UserService } from 'src/app/service/user.service';
import { VoiceForSiteService } from 'src/app/service/voice-for-site.service';

@Component({
  selector: 'app-voice-operators-site',
  templateUrl: './voice-operators-site.component.html',
  styleUrls: ['./voice-operators-site.component.scss']
})
export class VoiceOperatorsSiteComponent implements OnInit {
  sites: Site[] = [];
  firstValue = 1;
  secondValue = 0;
voiceSiteCreateDate = Date.now();
voiceSiteUpdateDate = Date.now();
date:Date;
latest_date:any;
update_latest_date :any;

msg = '';

  sitenameRefer:any;
  siteIdRefer:any;
  respectedUser =new Createuser();
getUserArray:any=[];
  marked = false;
voiceSiteObj=new VoiceOperatorForSite();
updateVoiceSiteObj=new VoiceOperatorForSite();

  constructor(public siteManagementservice:SitemanagementService,private toaster:ToastrService,public voiceForSite:VoiceForSiteService,public datepipe: DatePipe,private userService: UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let username = this.route.snapshot.params['userName'];
    console.log("this is the username",username)
    this.allSites();
    this.getAllVoicesForSite();

    this.userService.getUser(username)
    .subscribe(data => {
      this.getUserArray=data;

      // this.user = data;
      this.respectedUser=this.getUserArray;
    }, error => console.log(error));
 
  }



  allSites(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
  
    this.siteManagementservice.getAll(data.id).subscribe((siteListResponse: Site[])=>{
      console.log("this is for site list response",siteListResponse);
      this.sites = siteListResponse;
      // var totalength=siteListResponse.length;
      // console.log(totalength);
      // for(this.siteList=1;this.siteList<=totalength;this.siteList++){
      //   this.count++;
      // }
      // console.log(this.count);
    }) 
    window.localStorage.removeItem('forgotData');
  }


  createVoiceSite(event,i){
    this.sitenameRefer = (<HTMLInputElement>document.getElementById("siteName_refer" + i)).innerHTML;
    this.siteIdRefer = (<HTMLInputElement>document.getElementById("siteId_refer" + i)).innerHTML;

    console.log("wjhbwfefwerf",(<HTMLInputElement>document.getElementById("siteName_refer" + i)))
    console.log("this is the sitename info", this.sitenameRefer)
    console.log("this is the siteid info", this.siteIdRefer)

    this.voiceSiteObj.sitename=this.sitenameRefer;
    this.date = new Date();

    this.latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    // this.update_latest_date = this.datepipe.transform(this.voiceSiteUpdateDate, 'yyyy-MM-dd hh:mm:ss');

    console.log("this is for created date",this.latest_date);
    this.voiceSiteObj.createdDate=this.latest_date;
let custId=this.respectedUser.custId;
let userid=this.respectedUser.user_id;
console.log("this is the customer info id", custId)

    this.marked = event.target.checked;
    if (this.marked == true) {
      this.voiceSiteObj.isVoiceoperator=this.firstValue;
  
      
      console.log("this is first", this.firstValue);
    } else {
      this.voiceSiteObj.isVoiceoperator=this.secondValue;
      console.log("this is second", this.secondValue);
    }
console.log("final object of voice for site",this.voiceSiteObj)
let isvoice=1;
if(this.voiceSiteObj.isVoiceoperator==isvoice){
  console.log("kwdmwekmfewf",)
  this.voiceForSite.createVoiceForSite(custId,this.siteIdRefer,userid,this.voiceSiteObj).subscribe(
      (res) => {
        console.log(res);
        this.msg="Voice Operator updated successfully!"
        this.toaster.success( this.msg);
      },
      error => {
        console.log("error exception");
        this.toaster.error(error);
      })
}else{
  this.date = new Date();
  this.update_latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');

this.updateVoiceSiteObj.sitename=this.voiceSiteObj.sitename;
this.updateVoiceSiteObj.isVoiceoperator=this.voiceSiteObj.isVoiceoperator;
this.updateVoiceSiteObj.createdDate= this.update_latest_date;
console.log("thisjksbdyshb",this.updateVoiceSiteObj)
this.voiceForSite.createVoiceForSite(custId,this.siteIdRefer,userid,this.updateVoiceSiteObj).subscribe(
      (res) => {
        console.log(res);
        this.msg="Voice Operator updated successfully!"
        this.toaster.success( this.msg);
      },
      error => {
        console.log("error exception");
        this.toaster.error(error);
      })
}
    // this.voiceForSite.createVoiceForSite(custId,this.siteIdRefer,userid,this.voiceSiteObj,).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.msg="Voice Operator updated successfully!"
    //     this.toaster.success( this.msg);
    //   },
    //   error => {
    //     console.log("error exception");
    //     this.toaster.error(error);
    //   })
  }

getAllVoicesForSite(){
  let data = JSON.parse(localStorage.getItem("acesscontroldata"));

  let custId=data.id

  this.voiceForSite.getAll(custId).subscribe((voiceOperatorResponse: VoiceOperatorForSite[]) => {
   console.log("wedjbnwejdfnwedwe",voiceOperatorResponse);
   for(let i=0;i<voiceOperatorResponse.length;i++){
     console.log("weufgweyfbewfwe",voiceOperatorResponse[i]);
     let checkedVoic=1;
     let uncheckedVoice=0;
     let siteIdChecked=voiceOperatorResponse[i].siteid;

     if(voiceOperatorResponse[i].isVoiceoperator==checkedVoic){
      (<HTMLInputElement>document.getElementById("sitevoicetext" + siteIdChecked)).checked=true;

     }else{
      (<HTMLInputElement>document.getElementById("sitevoicetext" + siteIdChecked)).checked=true;

     }

   }
  })
}


}

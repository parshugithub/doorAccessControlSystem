import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SipSetting } from '../modal/sip-setting';
import { SipSettingService } from '../service/sip-setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  tableData: any =[];
  showEditTable:boolean = false;
  editRowID: any = '';
  updateSipObject=new SipSetting();
   allSips: SipSetting[] = [];
   sipSetting=new SipSetting();
   serverAddressRefer:any;
   registerIntervalRefer:any;
   portRefer:any;
   referDate: any;
   confirmation:any;
   date: Date;
 msg='';
   ngOnInit(): void {
     this.gettingAllSipSettings();
     this.date = new Date();
       this.referDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
     
 
 }
 
 
 constructor(public sipService:SipSettingService ,private toaster:ToastrService,public datepipe: DatePipe) {
 
   this.tableData= [
     {id:1,name: 'Mahi', mobile:'456465' , email:'mahi@gmail.com'},
     {id:2,name: 'Alice', mobile:'458765' , email:'Alice@gmail.com'},
     {id:3,name: 'Bob', mobile:'456448' , email:'Bob@gmail.com'}
   ]
  }
 
 
 createSip() {
   let data = JSON.parse(localStorage.getItem("acesscontroldata"));
   this.sipSetting.createddate = this.referDate;
   this.serverAddressRefer = (<HTMLInputElement>document.getElementById("server_Address")).value;
   this.registerIntervalRefer = (<HTMLInputElement>document.getElementById("register_interval")).value
   this.portRefer = (<HTMLInputElement>document.getElementById("port_number")).value
   this.sipSetting.serverAddress = this.serverAddressRefer;
   this.sipSetting.registerInterval = this.registerIntervalRefer;
   this.sipSetting.portNumber= this.portRefer;
   this.sipService.createSipSetting(data.id,this.sipSetting).subscribe(
     (res) => {
       console.log(res);
       this.msg = 'Data saved successfully';
       this.toaster.success(this.msg);
       this.gettingAllSipSettings();
     },
     error => {
       this.msg = "Inetrnal error";
       this.toaster.error(this.msg);
     }
   )
 }
 
 
  
 updateSip(sip){
   let data = JSON.parse(localStorage.getItem("acesscontroldata"));
 
   console.log("this is the particular row", sip );
   this.updateSipObject.serverAddress=sip.serverAddress;
   this.updateSipObject.registerInterval=sip.registerInterval;
   this.updateSipObject.portNumber=sip.portNumber;
   this.updateSipObject.createddate=sip.createddate;
 let idRefer=sip.id;
 console.log("this is teh sip id ",idRefer)
   console.log("this is the final row",this.updateSipObject)
 
   this.sipService.updateSipData(idRefer,data.id,this.updateSipObject).subscribe(
     (res) => {
       console.log(res);
       this.msg='Data saved successfully';
       this.toaster.success(this.msg);
     },
     error => {
       console.log("error exception");
       this.msg = error.error;
       this.toaster.error(this.msg);
 
     }
   )
 
 
 }
 
  Edit(val){
    this.editRowID= val;
    console.log("this is the particular row",this.editRowID)
  
 
 
  }
 
 
 
 gettingAllSipSettings(){
   let data = JSON.parse(localStorage.getItem("acesscontroldata"));
   console.log(data); 
   this.sipService.getAllSipSettings(data.id).subscribe((sipListResponse: SipSetting[])=>{
     this.allSips = sipListResponse;
  console.log( "assigned sips",this.allSips)
  }
   )  
 
 }
 
 
 
 deleteSipCalling(sip){
   console.log("about to delete site - "+sip.id);
   let sidIdRefer=sip.id;
   console.log("thus is the sip id",sidIdRefer)
   this.confirmation=confirm("Are you sure to delete "+sip.serverAddress)
   
   if(this.confirmation==true)
   {
   this.sipService.deleteSip(sidIdRefer)
   .subscribe((res)=>{
   this.msg="Sip deleted Successfully"
   this.toaster.success(this.msg);
   
   this.gettingAllSipSettings();
   
   });
   }
   else{
   console.log("false sip cancelled");
   
   }
   }
   
 
 
 
 serverCreate(event) {
 }
 
 registerCreate(event) {
 }
 port(event) {
 }
 
 serverAdd(event,i){
 
   console.log(" this is door description values",event);
   // this.allDesc=i+1;
   // console.log("asxcbsahxcsa",this.allDesc)
   // this.doorsDescArray.push(this.allDesc)
   // console.log("doorsDescArray",this.doorsDescArray)
   
   
   }
   registerAdd(event,i){
     console.log(" this is door description values",event);
     }
     portNumberAdd(event,i){
       console.log(" this is door description values",event);
       }
 
 
 }
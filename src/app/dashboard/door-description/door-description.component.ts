import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { Door } from 'src/app/modal/door';
import { DoorDescription } from 'src/app/modal/door-description';
import { DoorDescriptionService } from 'src/app/service/door-description.service';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-door-description',
  templateUrl: './door-description.component.html',
  styleUrls: ['./door-description.component.scss']
})
export class DoorDescriptionComponent implements OnInit {
  tooTalDoorDesc:any = [];
selectedDoorDescIds = [];
schedule=[];
doorMain=new Door();
  doorDesModel='';
  doorDescriptionObj=new DoorDescription();
allDesc:any;
totalDoorDescDeleteReference:any;
  doorDescIdReference:any;
  doorDesc:any;
  doorRefer:any;
  doorAllRefer:any;
  doorNameRefere:any;
  doorTele:any;
  doorSip:any;
  doorDtmf:any;
  doorCamera:any;
  accessingDoorNumber:any;
  accessingDoorId:any;
  uniqueDesRow:any;
  accessingDoorName:any;
  doorDescriptionReference:any;
  doorTelePhoneReference:any;
  doorSipUrlReference:any;
  doorDtmfReference:any;
  doorCameraReference:any;
  totalDoorDescription:DoorDescription[] = [];
allSaveDesc:any=[];
singleArray:any = [];
  accessingDoorDesc:any;
  totalDoors: any;
  msg = '';
  doors: Door[] = [];
   doorsDescriptionsArray:any;
  door: any;
  doorsDescArray:any=[]
  constructor(private router: Router,public userService: UserService,private moveToSite:MoveToSiteService,private route: ActivatedRoute,private doorto:DoorDescriptionService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.fetchDoor();
    this.fetchingAllDoorDescrioption();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.refreshPage();
    });
  }
refreshPage() {
    console.log("this is for refresh page")
    window.location.reload();
  }


  getScheduleForPerson(scheduleidval,checked)
  {
    if(checked){
      this.schedule.push(scheduleidval);

    console.log("the selcted schedule are ",scheduleidval);
    this.doorto.getDoorDesc(scheduleidval).subscribe((response: DoorDescription[]) => {
      console.log("the sch group ", response)
      this.doorDescIdReference=response;
      console.log("this is for door description id",this.doorDescIdReference)
      localStorage.setItem("doorDescId", JSON.stringify(this.doorDescIdReference));

      })
    const staffScheduleId = Object.assign({}, this.doorMain);

    console.log("this is forselectededfedfe ", staffScheduleId)

    var checkedScheduleId=this.selectedDoorDescIds.includes(staffScheduleId);
  if(!checkedScheduleId){
    this.selectedDoorDescIds.push(staffScheduleId);
    console.log("this is forselected ",  this.selectedDoorDescIds)

  }

  }else {
    this.selectedDoorDescIds.splice(this.selectedDoorDescIds.indexOf(scheduleidval), 1);
    }

  }


  checkedSchedul(doorId) {
    if (this.selectedDoorDescIds.indexOf(doorId) != -1) {
      return true;
    }
  }
  


  // refreshPage() {
  //   console.log("this is for refresh page")
  //   window.location.reload();
  // }
fetchingAllDoorDescrioption(){
  let siteid = this.route.snapshot.paramMap.get('siteid');
console.log("site id is",siteid);

  this.doorto.getAllDoorDescription(siteid).subscribe((doorDescription: DoorDescription[])=>{
    console.log("this is only total doorDescription",doorDescription);
    this.totalDoorDescription=doorDescription;
    this.accessingDoorDesc=this.totalDoorDescription.map(t=>t.description);
    console.log("this is total doorDescription",this.accessingDoorDesc);
    console.log("this is  total doorDescription",this.totalDoorDescription);
    console.log("this is the reference of doors",this.doors);

    console.log("this is the reference of doors",this.doors);


    console.log("this is for trade code and door response ", this.totalDoorDescription.length);
    for(let i=0;i<this.totalDoorDescription.length;i++){
      let doorNameReference=this.totalDoorDescription[i].door;
      console.log("thisis the door",doorNameReference);
      this.totalDoorDescription[i];
      console.log("thiserfbehfber",this.totalDoorDescription[i].description);
      this.doorDescriptionReference=this.totalDoorDescription[i].description;
      this.doorTelePhoneReference=this.totalDoorDescription[i].telephoneNUmber;
      this.doorSipUrlReference=this.totalDoorDescription[i].sip_url;
      this.doorDtmfReference=this.totalDoorDescription[i].dtmf;
      this.doorCameraReference=this.totalDoorDescription[i].cameraStream;
      
      console.log("this is the actual conetent",this.doorDescriptionReference);
      console.log("this i jscnsdjcnsd",(<HTMLInputElement>document.getElementById("doorvalue"+(doorNameReference-1))));

      (<HTMLInputElement>document.getElementById("doorvalue"+(doorNameReference-1))).value=this.doorDescriptionReference;
      (<HTMLInputElement>document.getElementById("tele"+(doorNameReference-1))).value=this.doorTelePhoneReference;
      (<HTMLInputElement>document.getElementById("sip"+(doorNameReference-1))).value=this.doorSipUrlReference;
      (<HTMLInputElement>document.getElementById("dtmf"+(doorNameReference-1))).value=this.doorDtmfReference;
      (<HTMLInputElement>document.getElementById("cam"+(doorNameReference-1))).value=this.doorCameraReference;     
    }


  })
}


fetchDoor(){
  this.moveToSite.getDoor().subscribe((Response:Door[])=>{
    console.log("the door response ", Response);
    this.totalDoors = Response;
    this.doors= this.totalDoors;
  console.log("sbhhscbhtyftweydfwetd",this.doors);
  })
}


createDoorDesc(i){
  console.log("door desc",i+1);
 // this.staffAccess.staff=this.accessingStaffId[i];
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.doorRefer=i+1;
    // tradecodewithid
    // (<HTMLInputElement>document.getElementById("doorid"+i)).innerHTML=this.doorReferDescId;
    console.log("this is door description id",this.doorRefer)
    // this.doorNameRefere=(<HTMLInputElement>document.getElementById("door_id"+i+1)).value;

  this.doorDesc=(<HTMLInputElement>document.getElementById("doorvalue"+i)).value;
  this.doorTele=(<HTMLInputElement>document.getElementById("tele"+i)).value;
  this.doorSip=(<HTMLInputElement>document.getElementById("sip"+i)).value;
  this.doorDtmf=(<HTMLInputElement>document.getElementById("dtmf"+i)).value;
  this.doorCamera=(<HTMLInputElement>document.getElementById("cam"+i)).value;
   this.doorDescriptionObj.door=this.doorRefer;
  //  if (  this.doorDesc == " " ||  this.doorTele == " ",  this.doorSip == " " ||  this.doorDtmf == "", this.doorCamera == " ") {
  //   alert("Please Fill All Required Field");
  //   console.log("please enter the fileds")
  //   return false;
  // }
   if (this.doorDesc == "") {
    alert("doorDescription can not be blank");
  } else if (this.doorTele == "") {
    alert("DoorTelephoneNumber can not be blank.");
  }else if (this.doorSip == "") {
    alert("doorSipNumber can not be blank.");
  }else if (this.doorDtmf == "") {
    alert("doorDtmfNumber can not be blank.");
  }else if (this.doorCamera == "") {
    alert("doorCamera  can not be blank.");
  }else{
    // this.doorDescriptionObj.door=this.doorReferDescId; 
this.doorDescriptionObj.description=this.doorDesc;
this.doorDescriptionObj.telephoneNUmber=this.doorTele;
this.doorDescriptionObj.sip_url=this.doorSip;
this.doorDescriptionObj.dtmf=this.doorDtmf;
this.doorDescriptionObj.cameraStream=this.doorCamera;

console.log("this is door description object",this.doorDescriptionObj)

let siteid = this.route.snapshot.paramMap.get('siteid');
console.log("site id is",siteid);




this.doorto.doorDesc(siteid,this.doorDescriptionObj).subscribe(
      ( res) =>{
        console.log(res);
        this.toaster.success(res);
        this.fetchingAllDoorDescrioption();
      },
      error => {
        this.toaster.error(error);

      }
     )
  }

}

saveAllDoorDesc(){
var i;
  var uniqueArray = [];

  for(i=0; i < this.doorsDescArray.length; i++){
    if(uniqueArray.indexOf(this.doorsDescArray[i]) === -1) {
        uniqueArray.push(this.doorsDescArray[i]);
    }
  }
  console.log("this is for unique",uniqueArray)

var tooTalSaveDoorDesc = [];

for( i = 0; i < uniqueArray.length; i++) {
    var obj = {};
       this.doorDesc=(<HTMLInputElement>document.getElementById("doorvalue"+(uniqueArray[i]-1))).value;
       this.doorTele=(<HTMLInputElement>document.getElementById("tele"+(uniqueArray[i]-1))).value;
    this.doorSip=(<HTMLInputElement>document.getElementById("sip"+(uniqueArray[i]-1))).value;
    this.doorDtmf=(<HTMLInputElement>document.getElementById("dtmf"+(uniqueArray[i]-1))).value;
    this.doorCamera=(<HTMLInputElement>document.getElementById("cam"+(uniqueArray[i]-1))).value;
console.log("wedewdwe",this.doorDesc)
    obj['door'] = uniqueArray[i];
    obj['description'] = this.doorDesc;

    obj['telephoneNUmber'] =  this.doorTele;
    obj['sip_url'] =  this.doorSip;
    obj['dtmf'] = this.doorDtmf;
    obj['cameraStream'] = this.doorCamera;
    tooTalSaveDoorDesc.push(obj);
}

console.log(tooTalSaveDoorDesc);
  let siteid = this.route.snapshot.paramMap.get('siteid');
  console.log("site id is",siteid);
  this.doorto.saveAll(siteid,tooTalSaveDoorDesc).subscribe(
    ( res) =>{ 
   
     this.msg='All Descriptions created Successfully';
     this.toaster.success(this.msg);
   },
     error =>{console.log("error exception");
   this.msg='Something went wrong';
   this.toaster.error(this.msg);

     
   })



}

goBackToCreateDoor(){
  this.router.navigate(['/door-management/create-door'])

}


descKey(event,i){

console.log(" this is door description values",event);
this.allDesc=i+1;
console.log("asxcbsahxcsa",this.allDesc)
this.doorsDescArray.push(this.allDesc)
console.log("doorsDescArray",this.doorsDescArray)


}


teleKey(event,i){
  this.allDesc=i+1;

  console.log(" this is tele values",event,i);
  console.log("SDSDSDS",this.allDesc)
  this.doorsDescArray.push(this.allDesc)
  console.log("doorsDescArray",this.doorsDescArray)


}

sipKey(event,i){
  this.allDesc=i+1;

  console.log(" this is sip values",event,i);
  console.log("BEVEW",this.allDesc)
  this.doorsDescArray.push(this.allDesc)
  console.log("doorsDescArray",this.doorsDescArray)

}
dtmfKey(event,i){
  this.allDesc=i+1;

  console.log(" this is tele values",event,i);
  console.log("VEWWE",this.allDesc)
  this.doorsDescArray.push(this.allDesc)
  console.log("doorsDescArray",this.doorsDescArray)

}

camKey(event,i){
  this.allDesc=i+1;

  console.log(" this is tele values",event,i);
  console.log("CVWEFDDWE",this.allDesc)
  this.doorsDescArray.push(this.allDesc)
  console.log("doorsDescArray",this.doorsDescArray)

}

numbersOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}



reloadDashboard(){
  window.location.reload();

}

goBack(){
  let siteInfo = JSON.parse(localStorage.getItem("siteInfo"));
  this.router.navigate(['/dashboard/view-site', siteInfo.siteName])
}


deleteDoorDesc(i)
{
  let siteid = this.route.snapshot.paramMap.get('siteid');

  console.log("site id is",siteid);
  console.log("thiserfbehfber",i+1);
this.doorDescIdReference=i+1;
console.log("this is for door description id resference",this.doorDescIdReference);
  this.doorto.doorDescDelete(this.doorDescIdReference,siteid).subscribe(
    ( res) =>{
      console.log(res);
      
        this.msg="Successfully deleted the specified Door description"
        this.toaster.success(this.msg);
        this.fetchingAllDoorDescrioption();
      if(res){
        this.reloadDashboard();

      }

     

    },
    error => {
      this.msg="Internal Server Eror";

      this.toaster.error(this.msg);

    }
   )
}


deleteAllDoorDescription(){
  console.log("this is the doordescription id",this.doorDescIdReference)
  let siteid = this.route.snapshot.paramMap.get('siteid');
for( let i=0;i<this.totalDoorDescription.length;i++){
this.totalDoorDescDeleteReference=this.totalDoorDescription[i]
console.log("thuis is for all door description", this.totalDoorDescDeleteReference.cameraStream);
var obj = {};
obj['door'] = this.totalDoorDescDeleteReference.door;
obj['description'] = this.totalDoorDescDeleteReference.description;

obj['telephoneNUmber'] =  this.totalDoorDescDeleteReference.telephoneNUmber;
obj['sip_url'] =  this.totalDoorDescDeleteReference.sip_url;
obj['dtmf'] = this.totalDoorDescDeleteReference.dtmf;
obj['cameraStream'] = this.totalDoorDescDeleteReference.cameraStream;
// var myJSON = JSON.stringify(obj);

this.tooTalDoorDesc.push(obj);

}
console.log("this is for the total doors Description",this.tooTalDoorDesc)
 this.doorto.doorDescAllDelete(this.tooTalDoorDesc,siteid).subscribe(
    (error) =>{
      // console.log(res);
      this.msg="atghrthrt"
      this.toaster.error(this.msg);
      this.fetchingAllDoorDescrioption();

    },
    (res) => {
      this.msg="all Descriptions Successsfully deleted"

      this.toaster.success( this.msg);
      if(res){
        this.reloadDashboard();

      }

    }
   )
}










}

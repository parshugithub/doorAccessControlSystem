import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccessType } from 'src/app/modal/access-type';
import { Door } from 'src/app/modal/door';
import { DoorDescription } from 'src/app/modal/door-description';
import { DoorManagement } from 'src/app/modal/door-management';
import { Person } from 'src/app/modal/person';
import { PersonGroup } from 'src/app/modal/person-group';
import { Property } from 'src/app/modal/property';
import { ScheduleMain } from 'src/app/modal/schedule-main';
import { Site } from 'src/app/modal/sitemodal';
import { DoorDescriptionService } from 'src/app/service/door-description.service';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { PersonInSiteService } from 'src/app/service/person-in-site.service';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { DoorManagementService } from 'src/app/service/door-management.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-door',
  templateUrl: './edit-door.component.html',
  styleUrls: ['./edit-door.component.scss']
})
export class EditDoorComponent implements OnInit {
siteList: Site[] = [];
responseDoor:any=[];
responseDoorSchedule:any=[];
  siteSelect:any;
  door = new DoorManagement();
  schedule=[];
  doorUpdatedDate:any;
  doorDescArray=[]
  personSchedule=[];
  description=[];
  personsSchedule: ScheduleMain[] = [];
  personsArray: Person[] = [];
  personGroupArray: PersonGroup[] = [];
doorDescRefer:any;
  scheduleMain = new ScheduleMain();
  personMain=new Person()
  personGroupMain=new PersonGroup()

  selectedScheduleIds = [];
  selectedPerson = [];
  selectedPersonGroup = [];
selectedDoorDesc=[];
  totalDoorDescription:DoorDescription[] = [];
  flatList:any=[];
  expanded = false;
  properties=new Property()
  arr = new Array();
  selectedFlats = [];
  flatNumberList:any;
  tooTalDoorDesc:any = [];
  selectedDoorDescIds = [];
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
  allSaveDesc:any=[];
  singleArray:any = [];
    accessingDoorDesc:any;
    totalDoors: any;
    msg = '';
    doors: Door[] = [];
     doorsDescriptionsArray:any;
    // door: any;
    doorsDescArray:any=[]
    date: Date;

  constructor(public siteManagementservice:SitemanagementService,public datepipe: DatePipe,private doorManagement:DoorManagementService,private toaster:ToastrService,private moveToSite:MoveToSiteService,private route: ActivatedRoute,private router:Router,public personInSiteService: PersonInSiteService,private doorto:DoorDescriptionService) { }

  ngOnInit(): void {
    this.date = new Date();

    this.doorUpdatedDate = this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss');

        let doorid = this.route.snapshot.params['doorid'];
console.log("this is for edit door",doorid);
this.doorManagement.getSingleDoorManagement(doorid)
  .subscribe(data => {
    console.log("getting door", data);
    // this.responseDoor=data;
    // for(let i=0;i<this.responseDoor.length;i++){
    //   console.log("this is for door",this.responseDoor[i].doordesc)

    // }
    this.updateSingleDoor(data);
  },error => console.log(error));

  this.allSites();
   this.gettingAllPersons();
    this.gettingAllPersonGroups();
  }
updateSingleDoor(door) {
 console.log("this is for door",door.doordesc);
this.responseDoorSchedule=door.schedule
console.log("this is foe schedule",this.responseDoorSchedule)
// for(let i=0;i<this.responseDoorSchedule.length;i++){
//   console.log("this is edbdewd",this.responseDoorSchedule[i].scheduleId)
//   this.schedule.push(this.responseDoorSchedule[i].scheduleId);


// }
 this.responseDoor=door.doordesc;
 for(let i=0;i<this.responseDoor.length;i++){
   console.log("this is for ewdwed",this.responseDoor[i].doorDesId);
   (<HTMLInputElement>document.getElementById("doorDescID")).value=this.responseDoor[i].doorDesId;

 }
    this.door = door;
   
  }
   allSites(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
  
    this.siteManagementservice.getAll(data.id).subscribe((siteListResponse: Site[])=>{
      console.log(siteListResponse);
      this.siteList = siteListResponse;
      var totalength=siteListResponse.length;
      console.log(totalength);
     
    }) 
  }

  accessTypes = [
    {
      id: "Tradecode",
      name: "Tradecode"
    },
    {
      id: "Fob",
      name: "Fob"
    },
   
  ];

  types=[
    {
      id: "persons",
      name: "persons"
    },
    {
      id: "personGroups",
      name: "personGroups"
    },
  ]
getFlatSelect(checked, value){
    if(checked){
      console.log("dbcdhcbdchd",value)
        // this.properties.flatnumber=value;
      const personClassdxIdCopy = Object.assign({}, this.properties);
  
     console.log("this is forselectededfedfe ", personClassdxIdCopy);
       this.arr.push(personClassdxIdCopy);
       this.selectedFlats.unshift(personClassdxIdCopy)
      
       console.log("this is forselected ",  this.selectedFlats)
  
    } else {
      this.selectedFlats.splice(this.selectedFlats.indexOf(value), 1)
    }
  }

  accessType = "siteAdmin";

  compareFn(c1: AccessType, c2: AccessType): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

   showCheckboxes() {
    // this.flatNumberList = this.flatList.map(t => t.flat);  
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }
  checked(value){
    if(this.selectedFlats.indexOf(value) != -1){
      console.log("edhvced",value)
      return true;
    }
  }

 getPersonToMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      console.log("getting site", dataList);
      this.siteSelect=dataList;
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));


  this.doorto.getAllDoorDescription(this.siteSelect.siteid).subscribe((doorDescription: DoorDescription[])=>{
    console.log("this is only total doorDescription",doorDescription);
    this.totalDoorDescription=doorDescription;
    // this.accessingDoorDesc=this.totalDoorDescription.map(t=>t.description);
    // console.log("this is total doorDescription",this.accessingDoorDesc);
    console.log("this is  total doorDescription",this.totalDoorDescription);
    // console.log("this is the reference of doors",this.doors);

    // console.log("this is the reference of doors",this.doors);


    // console.log("this is for trade code and door response ", this.totalDoorDescription.length);
    // for(let i=0;i<this.totalDoorDescription.length;i++){
    //   let doorNameReference=this.totalDoorDescription[i].door;
    //   console.log("thisis the door",doorNameReference);
    //   this.totalDoorDescription[i];
    //   console.log("thiserfbehfber",this.totalDoorDescription[i].description);
    //   // this.tradeCodeReferenceId=this.totalTradeCodeAndDoors[i].tradid;
    //   this.doorDescriptionReference=this.totalDoorDescription[i].description;
    //   this.doorTelePhoneReference=this.totalDoorDescription[i].telephoneNUmber;
    //   this.doorSipUrlReference=this.totalDoorDescription[i].sip_url;
    //   this.doorDtmfReference=this.totalDoorDescription[i].dtmf;
    //   this.doorCameraReference=this.totalDoorDescription[i].cameraStream;
      
    //   console.log("this is the actual conetent",this.doorDescriptionReference);
    //   console.log("this i jscnsdjcnsd",(<HTMLInputElement>document.getElementById("doorvalue"+(doorNameReference-1))));

    //   (<HTMLInputElement>document.getElementById("doorvalue"+(doorNameReference-1))).value=this.doorDescriptionReference;
    //   (<HTMLInputElement>document.getElementById("tele"+(doorNameReference-1))).value=this.doorTelePhoneReference;
    //   (<HTMLInputElement>document.getElementById("sip"+(doorNameReference-1))).value=this.doorSipUrlReference;
    //   (<HTMLInputElement>document.getElementById("dtmf"+(doorNameReference-1))).value=this.doorDtmfReference;
    //   (<HTMLInputElement>document.getElementById("cam"+(doorNameReference-1))).value=this.doorCameraReference;     
    // }


  })

  this.personInSiteService.getSchedueles(data.id,this.siteSelect.siteid).subscribe((response: ScheduleMain[]) => {
    console.log("the sch group ", response)
  
    this.personsSchedule = response;
  
    console.log("this djbcdjcbdc",this.personsSchedule)
    })

  this.personInSiteService.getAll(data.id,this.siteSelect.siteid).subscribe((response: Person[]) => {
    console.log("the sch group ", response)
  
    this.personsArray = response;
  
    console.log("this djbcdjcbdc",this.personsArray)
    }) 
    
  this.personInSiteService.getPersonGroupForSite(data.id,this.siteSelect.siteid).subscribe((response: PersonGroup[]) => {
    console.log("the ededdwqdwqd group ", response)
  
    this.personGroupArray = response;
  
    console.log("this djbcdjcbdc",this.personGroupArray)
    }) 
    }, error => console.log(error));
  
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

let siteid= this.siteSelect;
console.log("this is for siteit",siteid)
  }


  getScheduleForPerson(j,scheduleidval,checked)
  {
    if(checked){
      this.schedule.push(scheduleidval);

    console.log("the selcted schedule are ",j);
    console.log("the selcted schedule are ",scheduleidval);
   // this.scheduleid=scheduleidval;
    this.scheduleMain.scheduleId=scheduleidval;

    const staffScheduleId = Object.assign({}, this.scheduleMain);

    console.log("this is forselectededfedfe ", staffScheduleId)

    var checkedScheduleId=this.selectedScheduleIds.includes(staffScheduleId);
  if(!checkedScheduleId){
    this.selectedScheduleIds.push(staffScheduleId);
    console.log("this is forselected ",  this.selectedScheduleIds)

  }

  }else {
    this.selectedScheduleIds.splice(this.selectedScheduleIds.indexOf(scheduleidval), 1);
    }

  }

  checkedPerson(personid) {
    if (this.selectedPerson.indexOf(personid) != -1) {
      return true;
    }
  }
  
  checkedSchedul(scheduleId) {
    if (this.selectedScheduleIds.indexOf(scheduleId) != -1) {
      return true;
    }
  }
  getForPerson(scheduleidval,checked)
  {
    if(checked){
      this.personSchedule.push(scheduleidval);
    console.log("the selcted schedule are ",scheduleidval);
   // this.scheduleid=scheduleidval;
    this.personMain.personid=scheduleidval;

    const staffScheduleId = Object.assign({}, this.personMain);

    staffScheduleId.pid = staffScheduleId.personid;
    delete staffScheduleId.personid;
    console.log("this is forselectededfedfe person", staffScheduleId)

    var checkedScheduleId=this.selectedPerson.includes(staffScheduleId);
  if(!checkedScheduleId){
    this.selectedPerson.push(staffScheduleId);
    console.log("this is forselected person",  this.selectedPerson)

  }

  }else {
    this.selectedPerson.splice(this.selectedPerson.indexOf(scheduleidval), 1);
    }

  }

  getForPersonGroup(m,scheduleidval,checked)
  {
    if(checked){
      this.personSchedule.push(scheduleidval);

    console.log("the selcted schedule are ",m);
    console.log("the selcted schedule are ",scheduleidval);
   // this.scheduleid=scheduleidval;
    this.personGroupMain.personGroupName=scheduleidval;

    const staffScheduleId = Object.assign({}, this.personGroupMain);

    // staffScheduleId.pid = staffScheduleId.personid;
    // delete staffScheduleId.personid;
    console.log("this is forselectededfedfe person", staffScheduleId)

    var checkedScheduleId=this.selectedPersonGroup.includes(staffScheduleId);
  if(!checkedScheduleId){
    this.selectedPersonGroup.push(staffScheduleId);
    console.log("this is forselected person",  this.selectedPersonGroup)

  }

  }else {
    this.selectedPersonGroup.splice(this.selectedPersonGroup.indexOf(scheduleidval), 1);
    }

  }

  checkedPersonGroup(pgroupid) {
    if (this.selectedPersonGroup.indexOf(pgroupid) != -1) {
      return true;
    }
  }
  getPersonTypeToMap(val,m) {
    console.log("thius hcw",m)
    console.log("this is for person or person group", val);
   
    // let sitename=val;
    // this.siteManagementservice.getSite(sitename)
    // .subscribe(dataList => {
    //   console.log("getting site", dataList);
    //   this.siteSelect=dataList;
    //   let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    // })
    }


  goToDoorDescription(){
     this.door.schedule=this.selectedScheduleIds;
    this.door.person=this.selectedPerson;
    this.door.persongroup=this.selectedPersonGroup;
    console.log("this is for create door object",this.door);
    localStorage.setItem("doorManagement", JSON.stringify(this.door));

    console.log("this is for door description",this.siteSelect.siteid)
    this.router.navigate(['dashboard/doorDescription',this.siteSelect.siteid])

  }



    numbersOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    
    }
    

   
   

    gettingAllPersons(){
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));

      this.personInSiteService.getAllPersons(data.id).subscribe((response: Person[]) => {
        console.log("the sch group ", response)
      
        this.personsArray = response;
      
        console.log("this djbcdjcbdc",this.personsArray)
        })
    }
    gettingAllPersonGroups(){
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));

      this.personInSiteService.getAllPersonGroups(data.id).subscribe((response: PersonGroup[]) => {
        console.log("the ededdwqdwqd group ", response)
      
        this.personGroupArray = response;
      
        console.log("this djbcdjcbdc",this.personGroupArray)
        })
    }

onSubmit() {
    this.updateDoor();    
  }
updateDoor(){
 this.door.schedule=this.selectedScheduleIds;
    this.door.person=this.selectedPerson;
    this.door.persongroup=this.selectedPersonGroup;
    this.door.updateddate=this.doorUpdatedDate;
    console.log("this is for update door object",this.door);
          let data = JSON.parse(localStorage.getItem("acesscontroldata"));
        let doorid = this.route.snapshot.params['doorid'];

//  this.doorManagement.updateDoorManagement(doorid,this.door).subscribe(
//       (res) => {
//         this.msg='Door updated successfully';
//         this.toaster.success(this.msg);
//         this.router.navigate(['door-management']);
// localStorage.removeItem('doorDescId');
// localStorage.removeItem('doorManagement');

//       },
//       error => {
//         console.log("error exception");
//         localStorage.removeItem('doorDescId');
// localStorage.removeItem('doorManagement');

//       }
//     )
}
}

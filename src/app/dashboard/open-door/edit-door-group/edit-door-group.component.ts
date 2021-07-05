import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { DoorGroup } from 'src/app/modal/door-group';
import { Site } from 'src/app/modal/sitemodal';
import { DoorGroupService } from 'src/app/service/door-group.service';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-door-group',
  templateUrl: './edit-door-group.component.html',
  styleUrls: ['./edit-door-group.component.scss']
})
export class EditDoorGroupComponent implements OnInit {
  doorgroupid:number;
  date:Date;
  totalDoors: any=[];
  siteid:number;
  site = new Site();
  referDoors:any;
  msg = '';
  counter:number;
  doorsContent:any=[];
editDoorGroupArray:any=[];
selectedDoorsArray:any=[];
  doorGroupExpiryDate:any;
  doorGroupCreateDate:any;
  doorGroup=new DoorGroup();
  selectedDoors = [];
  doorArray: any = [];
  part:any=[];
  show = false;
  // toggle() {
  //   this.show = !this.show
  //   console.log("this is the doors array",this.doorArray)
   
  //   if(this.show) {
  //     for(let i=0;i<this.doorArray.length;i++){
  //       console.log("wejdknwjd",this.doorArray[i])
  //       console.log("sdjncjnwec",this.doorArray[i]);
  //         (<HTMLInputElement>document.getElementById("door" +i)).checked=true;
  // console.log("wequdhuydqw", (<HTMLInputElement>document.getElementById("door" +i)));
  //     }
  //   console.log(this.show)
  //   }
  //   else {
  //   }
  //   }
// doorgroupid:number
  constructor(public userService: UserService,private route: ActivatedRoute,public datepipe: DatePipe,private toaster:ToastrService,private moveToSite:MoveToSiteService, private router: Router,private doorGroupService:DoorGroupService) { }

  ngOnInit(): void {
    this.moveToSite.getDoor().subscribe((Response:Door[])=>{
      console.log("the door response ", Response);
      this.totalDoors = Response;
      this.getDoorShowMoreData();

    })
    this.doorgroupid = this.route.snapshot.params['doorgroupid'];
     this.doorGroupService.getOnlySingleDoorGroup(this.doorgroupid)
      .subscribe(data => {
        console.log("getting doorGroup", data);
        this.editDoorGroupArray=data;
        console.log("getting doorGroup doors", this.editDoorGroupArray.doors);
        this.selectedDoorsArray=this.editDoorGroupArray.doors;
        console.log("getting  doors", this.selectedDoorsArray);
for(let i=0;i<this.selectedDoorsArray.length;i++){
  this.selectedDoorsArray[i].doorName
  console.log("wedbweydfwevbdfwe",this.selectedDoorsArray[i].doorName);
  
// this.referDoors=this.selectedDoorsArray[i].doorName;
// console.log("this is the doors numbers clicked values",this.referDoors)
this.doorArray.push(this.selectedDoorsArray[i].doorName);

console.log("this is the doors array",this.doorArray)
for(let i=0;i<this.doorArray.length;i++){
      (<HTMLInputElement>document.getElementById("door"  + (this.doorArray[i]-1))).checked=true;

}

  //  (<HTMLInputElement>document.getElementById("door"  + i)).checked=true;

}

        this.updateSingleDoorGroup(data) 
      }, error => console.log(error));
    
      // this.site = new Site();
      // this.siteid = this.route.snapshot.params['siteid'];


     
  }


  getDoorShowMoreData(){
    console.log(this.counter + 'dat size'+this.totalDoors.length)
    for(let i=this.counter+1;i<this.totalDoors.length;i++)
    {
    this.doorsContent.push(this.totalDoors[i-1]);
    console.log("ewdbwehbwefwe",this.doorsContent)
    if(i%10==0) break;
    }
    this.counter+=10;
    
  }
  


  checked(doors) {
    if (this.selectedDoors.indexOf(doors) != -1) {
      // console.log("jbwefwefwfwefhvbdfvdf",this.selected)

      return true;
    }
  }
  onChange(checked, doors) {
    if (checked) {
      console.log("jbhvbdfvdf", doors);
     // (<HTMLInputElement>document.getElementById("add")).value=doors;
      this.moveToSite.getSingleDoor(doors).subscribe((DoorResponse: Door) => {
        console.log("the door response ", DoorResponse)
        this.selectedDoors.push(DoorResponse);
        this.doorArray.push(DoorResponse.doorId);  
      })
      console.log("jbhvbdffffvdf", this.selectedDoors)
    }

    else {
      this.selectedDoors.splice(this.selectedDoors.indexOf(doors), 1);
      console.log("webwefbweffwe", this.selectedDoors)
    }
  }
  goBack() {
    this.siteid = JSON.parse(localStorage.getItem("openDoorRefrenceSiteid"));
console.log("this is for edit doscjknsdcjsdc",this.siteid)
    this.router.navigate(['dashboard/openDoor',this.siteid])
    
  }

  updateSingleDoorGroup(doorGroup) {
    console.log("update the doorgroup",doorGroup)
    this.doorGroup = doorGroup;
    this.doorGroup.expiraydate = new Date((this.doorGroup.expiraydate.toString())).toISOString().substr(0, 16);
  }
  onSubmit() {
    this.updateDoorGroup();    
  }

  updateDoorGroup(){
    this.date = new Date();
    // this.doorGroupCreateDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    // this.doorGroup.createdDate = this.doorGroupCreateDate;
    let x1 = (<HTMLInputElement>document.getElementById("dateExpiry")).value;
    this.doorGroupExpiryDate = this.datepipe.transform(x1, 'yyyy-MM-dd hh:mm:ss');
    this.doorGroup.expiraydate = this.doorGroupExpiryDate;
    console.log("the doors are ", this.selectedDoors)
    this.doorGroup.doors = this.selectedDoors;
    console.log("the door group object ", this.doorGroup)
    this.doorGroupService.updateDoorgroupData(this.doorgroupid,this.doorGroup).subscribe(
      (res) => {
        this.siteid = JSON.parse(localStorage.getItem("openDoorRefrenceSiteid"));
        this.router.navigate(['dashboard/openDoor',this.siteid])
        this.msg='successfully doorgroup updated';
        this.toaster.success(this.msg);

    
      },
      error => {
        console.log("error exception");
      this.msg = error.error;
      this.toaster.error(this.msg);

      }
    )
  }
}
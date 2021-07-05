
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { debug } from 'console';
// import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { DoorGroup } from 'src/app/modal/door-group';
import { Site } from 'src/app/modal/sitemodal';
import { DoorManagementDoorGroupService } from 'src/app/service/door-management-door-group.service';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-doorgroup',
  templateUrl: './edit-doorgroup.component.html',
  styleUrls: ['./edit-doorgroup.component.scss']
})
export class EditDoorManagementGroupComponent implements OnInit {
  doorgroupid:number;
  date:Date;
  totalDoors: any=[];
  siteid:number;
  site = new Site();
  referDoors:any;
  msg = '';
  counter:number;
  expiryDate: string;
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
  
  constructor(public userService: UserService,private route: ActivatedRoute,public datepipe: DatePipe,private toaster:ToastrService,private moveToSite:MoveToSiteService, private router: Router,
    private doorManagementDoorGroupService:DoorManagementDoorGroupService) { }

  ngOnInit(): void {
  
    this.moveToSite.getDoor().subscribe((Response:Door[])=>{
      console.log("the door response ", Response);
      this.totalDoors = Response;
      this.getDoorShowMoreData();

    })
    ;
    debugger;
    this.doorgroupid = this.route.snapshot.params['doorgroupid'];
     this.doorManagementDoorGroupService.getOnlySingleDoorGroup(this.doorgroupid)
      .subscribe(data => {
        console.log("getting doorGroup", data);
        this.editDoorGroupArray=data;
        debugger;
        console.log("getting doorGroup doors", this.editDoorGroupArray.doors);
        this.selectedDoorsArray=this.editDoorGroupArray.doors;
        console.log("getting  doors", this.selectedDoorsArray);

for(let i=0;i<this.selectedDoorsArray.length;i++){
  this.selectedDoorsArray[i].doorName
  console.log("wedbweydfwevbdfwe",this.selectedDoorsArray[i].doorName);
  

this.doorArray.push(this.selectedDoorsArray[i].doorName);

for(let i=0;i<this.doorArray.length;i++){
      (<HTMLInputElement>document.getElementById("door"  + (this.doorArray[i]-1))).checked=true;

}


}

        this.updateSingleDoorGroup(data) 
  this.doorGroup.expiraydate = new Date((this.doorGroup.expiraydate)).toISOString().substr(0, 16);

      }, error => console.log(error));
    
  }


  getDoorShowMoreData(){
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

      return true;
    }
  }
  onChange(checked, doors) {
    if (checked) {
      console.log("jbhvbdfvdf", doors);
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
    this.router.navigate(['door-management'])
    
  }

  updateSingleDoorGroup(doorGroup) {
    debugger;
    console.log("update the doorgroup",doorGroup)
    this.doorGroup = doorGroup;
  //  this.expiryDate = this.doorGroup.expiraydate;

   localStorage.setItem("DMExpiryDate", JSON.stringify(this.expiryDate));
    // $('#dateExpiry').val(new Date(this.expiryDate).toISOString().substr(0, 16));
    
    $(document).ready(function(){
      $('#dateExpiry').val(new Date(JSON.parse(localStorage.getItem("DMExpiryDate"))).toISOString().substr(0, 16));
      });
  }
  onSubmit() {
    this.updateDoorGroup();    
  }
    
  updateDoorGroup(){
    this.date = new Date();
    let x1 = (<HTMLInputElement>document.getElementById("dateExpiry")).value;
    this.doorGroupExpiryDate = this.datepipe.transform(x1, 'yyyy-MM-dd hh:mm:ss');
    this.doorGroup.expiraydate = this.doorGroupExpiryDate;
    console.log("the doors are ", this.selectedDoors)
    this.doorGroup.doors = this.selectedDoors;
    console.log("the door group object ", this.doorGroup)
    this.doorManagementDoorGroupService.updateDoorgroupData(this.doorgroupid,this.doorGroup).subscribe(
      (res) => {
        this.siteid = JSON.parse(localStorage.getItem("doorManagementReferenceSiteid"));
        this.router.navigate(['door-management']);
        this.msg='successfully door group updated';
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

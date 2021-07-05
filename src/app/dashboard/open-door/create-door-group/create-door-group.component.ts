import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { DoorGroup } from 'src/app/modal/door-group';
import { Site } from 'src/app/modal/sitemodal';
import { DoorGroupService } from 'src/app/service/door-group.service';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-door-group',
  templateUrl: './create-door-group.component.html',
  styleUrls: ['./create-door-group.component.scss']
})
export class CreateDoorGroupComponent implements OnInit {
  date: Date;
  totalDoors: any=[];
 counter:number;
 site = new Site();
 siteid:number;
 doorsContent:any=[];
 msg = '';
 doorGroupExpiryDate: any;
  doorGroupCreateDate: any;
  doorGroup = new DoorGroup();
  selectedDoors = [];
  doorArray: any = [];
  part: any = [];
    show = false;
    
  toggle() {
    this.show = !this.show

    if (this.show) {
      console.log(this.show)
    }
    else {
    }
  }
  constructor(public userService: UserService,private route: ActivatedRoute,private router: Router, private moveToSite: MoveToSiteService, private doorGroupService: DoorGroupService, public datepipe: DatePipe, private toaster: ToastrService) { }

  ngOnInit(): void {
     this.date = new Date();
    $(document).ready(function(){
      
      this.elem = document.getElementById("dateExpiry"); 
      console.log("ghvfdafghsd",document.getElementById("dateExpiry"));
      console.log("elem",this.elem);
      

      //  var iso = new Date(Date.now());
      var iso = new Date(Date.now()).toISOString().substr(0, 16);
       console.log("current time",iso);

       let currtime=moment.utc(iso).local();
       console.log("indian time",currtime.format('YYYY-MM-DDThh:mm')); //2021-04-17T08:33

       this.jstoday1=currtime.toISOString();
       console.log("indian timeiso",this.jstoday1);
       this.elem.value = currtime.format('YYYY-MM-DDThh:mm');
       this.elem.min = currtime.format('YYYY-MM-DDThh:mm');
       console.log(" this.elem.min", this.elem.min); 

    });
    this.counter=0;
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      console.log("the door response ", Response);
      this.totalDoors = Response;
      // var obj = {};
// obj["doorId"] = this.totalDoors.label;
// obj["doorName"] = this.totalDoors.value;
// obj["doorId"] =1;
// obj["doorId"] =1;

// this.totalDoors.push(obj);
      this.getDoorShowMoreData();
    })
    this.site = new Site();
this.siteid = this.route.snapshot.params['siteid'];


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

  createDoorGroup() {
    this.siteid = this.route.snapshot.params['siteid'];
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

    this.date = new Date();
    this.doorGroupCreateDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    this.doorGroup.createdDate = this.doorGroupCreateDate;
    let x1 = (<HTMLInputElement>document.getElementById("dateExpiry")).value;
    this.doorGroupExpiryDate = this.datepipe.transform(x1, 'yyyy-MM-dd hh:mm:ss');
    this.doorGroup.expiraydate = this.doorGroupExpiryDate;
    console.log("the doors are ", this.selectedDoors)
    this.doorGroup.doors = this.selectedDoors;
    console.log("the door group object ", this.doorGroup)
      this.doorGroupService.doorGroupPost(data.id,this.siteid,this.doorGroup).subscribe(
      (res) => {
       console.log("dcjhbsdchdbcsdc",res)
       this.msg='doorGroup created successfully';
       this.toaster.success(this.msg);
       this.router.navigate(['dashboard/openDoor',this.siteid])

      },          

      error => {
      }
    )
  }
  goBack(siteid) {
    this.router.navigate(['dashboard/openDoor',this.siteid])
  }
  

  

}

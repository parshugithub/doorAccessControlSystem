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
  selector: 'app-open-door',
  templateUrl: './open-door.component.html',
  styleUrls: ['./open-door.component.scss']
})
export class OpenDoorComponent implements OnInit {
  searchText;
  siteid:number;
    msg="";
    show = false;
    accessingDoorNumber:any;
    flag:boolean = true;
    totalDoors: any;
    doors: Door[] = [];
    doorGroups: DoorGroup[] = [];
    site = new Site();
  
    selectedDoors = [];
    messages:any = [];
  onlyDoorName=[];
    colorvalue:any;
    singledoor: any;
    doorsingle:any=[];
    openDoor=new Door();
    date:Date;
    doorGroup=new DoorGroup();
    constructor(public userService: UserService,private route: ActivatedRoute,private router: Router,private moveToSite:MoveToSiteService,private doorGroupService:DoorGroupService,public datepipe: DatePipe,private toaster:ToastrService) { }
  
    ngOnInit(): void {
      this.moveToSite.getDoor().subscribe((Response:Door[])=>{
        console.log("the tootal door response ", Response);
        this.totalDoors = Response;
      })
  this.gettingAllDoorGroups();
  this.site = new Site();
  this.siteid = this.route.snapshot.params['siteid'];
  
  
    }
  
    
  
    changeColor(door,i)
    {
      if(this.flag==true)
      {
        console.log("if flag 1 ",this.flag)
        this.flag=false;
       this.colorvalue=(<HTMLInputElement>document.getElementById("door"+i)).style.backgroundColor="#6a99e1ff";
        console.log("if flag 2",this.flag)
        this.flag=false;
        
    
      }
     else
     {
      console.log("else flag 1",this.flag)
      this.flag=true;
        console.log(" another if called");
        this. colorvalue= (<HTMLInputElement>document.getElementById("door"+i)).style.backgroundColor = "";
        this.flag=true;
        console.log("else flag 2",this.flag)
        
      }
      if(this.colorvalue=='#6a99e1ff')
      {
        this.onAdd(door,i)
      }
       
    }
  
  
    onAdd(door,i) {
      console.log("the door values are ", door)
      console.log("the askdasd ", i)
      this.moveToSite.getSingleDoor(door).subscribe((Response: Door) => {
        // console.log("the door response ", Response)
        this.singledoor = Response;
        this.selectedDoors.push(this.singledoor);
        // console.log("this for only selected doors",this.selectedDoors)
        // this.toaster.success("Successfully opened door",this.singledoor.doorName);
      })
      this.moveToSite.getSingleForEmbeddedDoor(door,this.siteid).subscribe((Response) => {
        // console.log("the door response ", Response)
        this.singledoor = Response;
        this.selectedDoors.push(this.singledoor);
        console.log("this for only selected doors",this.selectedDoors)
        this.toaster.error(Response,this.singledoor.doorName);
      },
      (error) =>{
  this.toaster.error(error,this.singledoor.doorName);
  
      }
      
      )
  
    }
    gettingAllDoorGroups(){
      this.siteid = this.route.snapshot.params['siteid'];
      console.log("this is the all door groups",this.siteid)
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));
      // let data = JSON.parse(localStorage.getItem("acesscontroldata"));
      
      localStorage.setItem("openDoorRefrenceSiteid", JSON.stringify(this.siteid));
      
      this.doorGroupService.getAll(this.siteid,data.id).subscribe((res: DoorGroup[])=>{
      console.log("we are using door group list",res);
      this.doorGroups = res;
      console.log("this is for doorgroup responce",this.doorGroups)
      })
      
      }
  
    update(doorgroupid){
      this.siteid = this.route.snapshot.params['siteid'];
  console.log("sdcbhcdbcsd",this.siteid)
      // console.log("this is for only doorgroup id",doorgroupid)
      // this.doorGroupService.getOnlySingleDoorGroup(doorgroupid)
      //   .subscribe(data => {
      //     console.log("getting personclass", data)
      //     this.doorGroups=data;
      //     console.log("this is the single person class", this.doorGroups)
      //   }, error => console.log(error));
      console.log(doorgroupid)
      // let data = JSON.parse(localStorage.getItem("acesscontroldata"));
      // localStorage.setItem("expiryDateReference", JSON.stringify(this.siteid));
      // data.expiraydate = new Date((data.expiraydate.toString())).toISOString().substr(0, 16);
      this.router.navigate(['dashboard/openDoor/editdoorgroup',doorgroupid]);
      
       }
  
       removeSingleDoorGroup(doorgroupid){
  console.log("this for deleting the doorgroup",doorgroupid);
  this.doorGroupService.deleteDoorGroup(doorgroupid)
        .subscribe((res)=>{
          console.log("this is the response",res);
          this.toaster.success(res);
          this.gettingAllDoorGroups()  
        },
         (err) => {
          console.log(err);
        }
        
        ); 
       }
    
       goBack(){
        let siteInfo = JSON.parse(localStorage.getItem("siteInfo"));
        this.router.navigate(['/dashboard/view-site', siteInfo.siteName])
      }
  
  
    // goBack() {
    //   this.router.navigate(['/dashboard'])
    // }
  
    goToDoorGroup(siteid){
      console.log("scjhbschbcsdh")
    this.router.navigate(['dashboard/openDoor/createdoorgroup',this.siteid])
  }
  goToDoorGroupMqtt(doorgroupid){
    console.log("this is for doorgroup id",doorgroupid)
    console.log("this is for siteid",this.siteid)
    this.doorGroupService.getDoorGroupForEmbeedded(doorgroupid,this.siteid).subscribe((res: DoorGroup[])=>{
      console.log("we are using door group list",res);
      
      this.doorGroups = res;
      console.log("this is for doorgroup responce",this.doorGroups)
    } ,(err) => {
      console.log(err);
      this.msg="Device is Offline";
      this.toaster.error(this.msg);
  
    }
    
    )
  
  }
  
  
  
  backToPersons(){
    console.log("eghfvbdshcdvbcdcd")
    
      this.router.navigate(['/persons',this.siteid])
  
    
  }
  
  }
  
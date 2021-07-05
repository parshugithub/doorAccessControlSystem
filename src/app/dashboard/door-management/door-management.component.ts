
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { DoorGroup } from 'src/app/modal/door-group';
import { Site } from 'src/app/modal/sitemodal';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { UserService } from 'src/app/service/user.service';
import {DoorManagementDoorGroupService} from 'src/app/service/door-management-door-group.service';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { ViewChild } from '@angular/core';
import { DoorManagementService } from 'src/app/service/door-management.service';
import { DoorManagement } from 'src/app/modal/door-management';



@Component({
  selector: 'app-door-management',
  templateUrl: './door-management.component.html',
  styleUrls: ['./door-management.component.scss']
})
export class DoorManagementComponent implements OnInit {
  @ViewChild('tabset') tabset: any;
  activeTab =2;
  siteSelect:any;
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
    siteList: Site[] = [];
    doorList:DoorManagement[]=[];
    selectedDoors = [];
    messages:any = [];
  onlyDoorName=[];
    colorvalue:any;
    singledoor: any;
    doorsingle:any=[];
    openDoor=new Door();
    date:Date;
    doorGroup=new DoorGroup();
    constructor(public userService: UserService,public siteManagementservice:SitemanagementService, private doorManagementDoorGroupService:DoorManagementDoorGroupService, 
      private route: ActivatedRoute,private router: Router,private moveToSite:MoveToSiteService,
      public datepipe: DatePipe,private toaster:ToastrService,private doorManagement:DoorManagementService) { 
        route.params.subscribe(val => {
          
          this.siteid = this.route.snapshot.params['siteid'];
           
      this.moveToSite.getDoor().subscribe((Response:Door[])=>{
        console.log("the tootal door response ", Response);
        this.totalDoors = Response;
      })
      
      this.allSites();
      this.gettingAllDoorGroups()  
  this.site = new Site();
  this.siteid = this.route.snapshot.params['siteid'];
  $(document).ready(function(){
    if(localStorage.getItem("doorManagementSiteName") != "null" && localStorage.getItem("doorManagementSiteName") != null)
    {
      let siteName = localStorage.getItem("doorManagementSiteName").replace(/[^0-9a-zA-Z]+/gi, '');
      $("#selectsite").val(siteName);
      
      localStorage.setItem("doorManagementSiteName", null);
    }
    
  });
        });
      }
  
    
    ngOnInit(): void {
this.gettingAllDoors();
    };
  gettingAllDoors(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    
      this.doorManagement.getAllDoorManagement(data.id).subscribe((doorListResponse: DoorManagement[])=>{
        this.doorList = doorListResponse;  
console.log("this is for door list",this.doorList)
      }) 
     
  }

  getDoorToMap(val){
    console.log("tyfyufgyu",val);
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

    let sitename=val;
   this.siteManagementservice.getSite(sitename)
           .subscribe(dataList => {
     console.log("getting site", dataList);
     this.siteSelect=dataList;
     this.siteid= this.siteSelect.siteid;
     console.log("this is tsdwdw",this.siteid)
 
     this.doorManagement. getAllDoorWithSite(data.id,this.siteid).subscribe((doorListResponse: DoorManagement[])=>{
      this.doorList = doorListResponse;  
console.log("this is for door list",this.doorList)
    })
          }, error => console.log(error));
 console.log(this.site)
 

     }

    
  
    changeColor(door,i)
    {
      if(this.flag==true)
      {
        this.flag=false;
       this.colorvalue=(<HTMLInputElement>document.getElementById("door"+i)).style.backgroundColor="#6a99e1ff";
        this.flag=false;
        
    
      }
     else
     {
      this.flag=true;
        this. colorvalue= (<HTMLInputElement>document.getElementById("door"+i)).style.backgroundColor = "";
        this.flag=true;
        
      }
      if(this.colorvalue=='#6a99e1ff')
      {
        this.onAdd(door,i)
      }
       
    }
    allSites(){
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    
      this.siteManagementservice.getAll(data.id).subscribe((siteListResponse: Site[])=>{
        this.siteList = siteListResponse;  

      }) 
     
    }
  
    goToDoorManagementDoor(){
      this.router.navigate(['/door-management/createDoor']);

    }

    goToDoorGroup(){
    this.router.navigate(['/door-management/create']);
  }



    onAdd(door,i) {
      this.moveToSite.getSingleDoor(door).subscribe((Response: Door) => {
        this.singledoor = Response;
        this.selectedDoors.push(this.singledoor);
      })
      this.moveToSite.getSingleForEmbeddedDoor(door,this.siteid).subscribe((Response) => {
        this.singledoor = Response;
        this.selectedDoors.push(this.singledoor);
        this.toaster.error(Response,this.singledoor.doorName);
      },
      (error) =>{
  this.toaster.error(error,this.singledoor.doorName);
  
      }
      
      )
  
    }
      
    
    gettingAllDoorGroups(){
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));
      this.siteid = this.route.snapshot.params['siteid'];
      if(this.siteid!=null && this.siteid != undefined){
      localStorage.setItem("doorManagementReferenceSiteid", JSON.stringify(this.siteid));
        this.doorManagementDoorGroupService.getAll(this.siteid,data.id).subscribe((res: DoorGroup[])=>{
        this.doorGroups = res;
        })
      }
      else{
this.doorManagementDoorGroupService.getAllCustomerDoorGroup(data.id).subscribe((res: DoorGroup[])=>{
this.doorGroups = res;

}, 
error => console.log(error));

}
      
      }
  



      getPersonToMap(val) {
         let sitename=val;
         localStorage.setItem("doorManagementSiteName", JSON.stringify(sitename));
        this.siteManagementservice.getSite(sitename)
                .subscribe(dataList => {
          console.log("getting site", dataList);
          this.siteSelect=dataList;
          this.siteid= this.siteSelect.siteid;
          let data = JSON.parse(localStorage.getItem("acesscontroldata"));
          this.router.navigate(['/door-management',this.siteSelect.siteid])
               }, error => console.log(error));
      console.log(this.site)
      
        let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    
    this.siteid= this.siteSelect; 
 
          }

    update(doorgroupid){
      debugger;
      this.siteid = this.route.snapshot.params['siteid'];
      this.router.navigate(['door-management/edit',doorgroupid]);
      
       }

       updateDoorManagement(doorid){
               this.router.navigate(['door-management/edit-door',doorid]);

       }
  
       removeSingleDoorGroup(doorgroupid){
  console.log("this for deleting the doorgroup",doorgroupid);
  this.doorManagementDoorGroupService.deleteDoorGroup(doorgroupid)
        .subscribe((res)=>{
          console.log("this is the response",res);
          this.toaster.success(res);
          
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
  
  //   goToDoorGroup(siteid){
  //     console.log("scjhbschbcsdh")
  //   this.router.navigate(['dashboard/openDoor/createdoorgroup',this.siteid])
  // }
  goToDoorGroupMqtt(doorgroupid){
    console.log("this is for doorgroup id",doorgroupid)
    console.log("this is for siteid",this.siteid)
    this.doorManagementDoorGroupService.getDoorGroupForEmbeedded(doorgroupid,this.siteid).subscribe((res: DoorGroup[])=>{
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
  deleteDoorCalling(doorid){
    console.log("this is for delete door calling",doorid)
  }
  
  }
  
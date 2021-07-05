import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { DoorGroup } from 'src/app/modal/door-group';
import { Site } from 'src/app/modal/sitemodal';
import { DoorGroupService } from 'src/app/service/door-group.service';
import { DoorManagementDoorGroupService } from 'src/app/service/door-management-door-group.service';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { PersonInSiteService } from 'src/app/service/person-in-site.service';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-doorgroup',
  templateUrl: './create-doorgroup.component.html',
  styleUrls: ['./create-doorgroup.component.scss']
})

export class CreateDoorManagementGroupComponent implements OnInit {
siteSelect:any;

  date: Date;
  totalDoors: any=[];
 counter:number;
 site = new Site();
 siteList: Site[] = [];

 siteid: number;
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
  constructor(public userService: UserService,private route: ActivatedRoute,public personInSiteService: PersonInSiteService,
     public siteManagementservice:SitemanagementService, private router: Router,
      private moveToSite: MoveToSiteService, private doorManagementDoorGroupService:DoorManagementDoorGroupService, public datepipe: DatePipe, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.allSites();
     this.date = new Date();
    $(document).ready(function(){
      
      this.elem = document.getElementById("dateExpiry"); 
      var iso = new Date(Date.now()).toISOString().substr(0, 16);

       let currtime=moment.utc(iso).local();

       this.jstoday1=currtime.toISOString();
       this.elem.value = currtime.format('YYYY-MM-DDThh:mm');
       this.elem.min = currtime.format('YYYY-MM-DDThh:mm');

    });
    this.counter=0;
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      console.log("the door response ", Response);
      this.totalDoors = Response;
   
      this.getDoorShowMoreData();
    })
    this.site = new Site();


  }


  checked(doors) {
    if (this.selectedDoors.indexOf(doors) != -1) {

      return true;
    }
  }
  onChange(checked, doors) {
    if (checked) {
      this.moveToSite.getSingleDoor(doors).subscribe((DoorResponse: Door) => {
        this.selectedDoors.push(DoorResponse);
        this.doorArray.push(DoorResponse.doorId);  
      })
    }

    else {
      this.selectedDoors.splice(this.selectedDoors.indexOf(doors), 1);
    }
  }
  getDoorShowMoreData(){
    for(let i=this.counter+1;i<this.totalDoors.length;i++)
    {
    this.doorsContent.push(this.totalDoors[i-1]);
    if(i%10==0) break;
    }
    this.counter+=10;
    
  }


  getPersonToMap(val) {
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.siteSelect=dataList;
      this.siteid= this.siteSelect.siteid;
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));

           }, error => console.log(error));
  
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

 this.siteid= this.siteSelect;

  }
  
  allSites(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
  
    this.siteManagementservice.getAll(data.id).subscribe((siteListResponse: Site[])=>{
      this.siteList = siteListResponse;
      var totalength=this.siteList.length;
    }) 
  }
  createDoorGroup() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

    this.date = new Date();
    this.doorGroupCreateDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    this.doorGroup.createdDate = this.doorGroupCreateDate;
    let x1 = (<HTMLInputElement>document.getElementById("dateExpiry")).value;
    this.doorGroupExpiryDate = this.datepipe.transform(x1, 'yyyy-MM-dd hh:mm:ss');
    this.doorGroup.expiraydate = this.doorGroupExpiryDate;
    this.doorGroup.doors = this.selectedDoors;
    localStorage.setItem("doorManagementReferenceSiteid", JSON.stringify(this.siteid));
      this.doorManagementDoorGroupService.doorGroupPost(data.id,this.siteid,this.doorGroup).subscribe(
      (res) => {
       this.msg='doorGroup created successfully';
       this.toaster.success(this.msg);
       this.router.navigate(['/door-management',this.siteid])
      },          

      error => {
      }
    )
  }
  goBack(siteid) {
    this.router.navigate(['door-management',this.siteid])
  }
  

  

}


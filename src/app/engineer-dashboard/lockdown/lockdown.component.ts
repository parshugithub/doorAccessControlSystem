import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { LockDown } from 'src/app/modal/lockdown';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-lockdown',
  templateUrl: './lockdown.component.html',
  styleUrls: ['./lockdown.component.scss']
})
export class LockdownComponent implements OnInit {

  data:any;
  // engineerSite=new EngineerSite();
  // engineerSitearray:EngineerSite[];
  // doorentity = new EngineerTotalDoors()
  lockdown = new LockDown();
  lockdownArray : LockDown[];
  doorentityarray =new Array(128);
  closeResult: string;
  totalDoors: Door[];
  siteid:any;
  //doorname= new Array();
  doorName:any[]=[];
  deviceId:any[]=[];
  locakTime:any[]=[];
  accessingDoorNumber: any;
  doors: any;
  doorNameval:any;
  today = new Date();
  jstoday = '';
  jstoday1 = '';
  doorSystemselection:string;

  alldoors= new Array(8);
  arralenghth: any;
  constructor(private modalService: NgbModal,
    public ngbModalService: NgbActiveModal,private moveToSite: MoveToSiteService,public datepipe: DatePipe,
     public _service: RegistrationService, public _router: Router, 
     private toaster: ToastrService,private route: ActivatedRoute,) { }


  ngOnInit(): void {

    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.siteid = this.route.snapshot.params['siteid'];
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      // console.log("the door response ", Response);
      this.totalDoors = Response;

      this.accessingDoorNumber = this.totalDoors.map(t => t.doorName);
      // console.log("this is accessing doornumber name", this.accessingDoorNumber);
      this.doors = this.accessingDoorNumber;
    })
    for (let i = 0; i < this.alldoors.length; i++) {
      this.alldoors[i]= i;
      
    }
    this.arralenghth=this.alldoors.length;


    this._service.getAlllockdown(this.siteid).subscribe(
      data => {
       if(data!=null)
       {
        // this.engineerSitearray=data;
         console.log("the respose is ",data)
         this.lockdownArray=data;
         for (let i = 0; i < this.lockdownArray.length; i++) {
           let door = this.lockdownArray[i].activatedondoor;
           let relay1 = this.lockdownArray[i].lockrelay1;
           let relay2 = this.lockdownArray[i].lockrelay2;
           console.log("the dooras are ",door)

           var doornumber=door.toString();
          // var lockrelay1=relay1.toString();
          // var lockrelay2=relay2.toString();
           console.log("akjsklfj",(<HTMLInputElement>document.getElementById("enable" + door)));
           (<HTMLInputElement>document.getElementById("doorname" + door)).value=doornumber;
           if(relay1=="Enable")
           {
            (<HTMLInputElement>document.getElementById("enable"+door)).checked =true;
            // (<HTMLInputElement>document.getElementById("disable" + door)).disabled =true;
           }
           else{
            (<HTMLInputElement>document.getElementById("disable" + door)).checked =true;
            // (<HTMLInputElement>document.getElementById("enable" + door)).disabled =true;
           }
           
           
         }
        // this.toaster.success("Power On Reset for door created")
        // localStorage.setItem("acesscontroldata", JSON.stringify(data));
       //  this._router.navigate(['/poweronreset',siteid])
         
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )



  }

  back()
  {
    this._router.navigate(['/sitedashboard',this.data.custID])
    
  }
  doorname(event,i,val)
  {
    console.log("dhaskjdh",val)
    var value="";
  //  this.doorNameval= this.doorNameval+val

    console.log("events is ",value.concat(val));
    this.lockdown.activatedondoor=Number(value.concat(val))
    // this.doorName.push(value)

  }
  deviceid(event,i,val)
  {
    var value="";
    console.log("events is ",event);
    // this.doorentity.doorDeviceId=Number(value.concat(val))
   // this.deviceId.push(val)

  }
  HR(event,i,val)
  {
    console.log("events is ",event)
    console.log("ksjsjf",val);
    // this.doorentity.doorType=val;


  }
  // NR(event,i,val)
  // {
  //   console.log("events is ",event)
  //   console.log("ksjsjf",val)

  // }

  locktime(event, i,val) {
    this.locakTime.push(val)
    console.log("eukj34hu34f", event, i);
    var value="";
    console.log("events is ",event);
    // this.doorentity.locktime=value.concat(val)

  }
  lockrelay(val)
  {
    console.log('the cval is ',val)
    if(val=='enable')
    {
      this.lockdown.lockrelay1='Enable';
      this.lockdown.lockrelay2='Disable';
    }
    else{
      this.lockdown.lockrelay2='Enable';
      this.lockdown.lockrelay1='Disable';

    }
    console.log("this.powerOnReset.lockrelay1",this.lockdown.lockrelay1)
    console.log("this.powerOnReset.lockrelay2",this.lockdown.lockrelay2)

  }
  addDoor(i,siteid)
  {
    console.log("siteid is",siteid)
    // this.powerOnReset.lockrelay1=this.doorSystemselection;
    // this.powerOnReset.lockrelay12=this.doorSystemselection;
    //this.powerOnReset.siteid=siteid;
    console.log("the object is ",this.lockdown);
    this._service.AddLockDown(siteid,this.lockdown).subscribe(
      data => {
       if(data!=null)
       {
        // this.engineerSitearray=data;
         console.log("the respose is ",data)
         this.toaster.success("Lockdown for door created")
        // localStorage.setItem("acesscontroldata", JSON.stringify(data));
        //  this._router.navigate(['/poweronreset',siteid])
         
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )



   
  }
  addRow(arraylenght)
  {
    console.log("the array length is ",arraylenght);
    this.alldoors.length=arraylenght+1;
    this.arralenghth=this.alldoors.length;
  


  }

}

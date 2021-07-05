import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { LossOfCan } from 'src/app/modal/lossofcan';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-lossofcan',
  templateUrl: './lossofcan.component.html',
  styleUrls: ['./lossofcan.component.scss']
})
export class LossofcanComponent implements OnInit {

  data:any;
  // engineerSite=new EngineerSite();
  // engineerSitearray:EngineerSite[];
  // doorentity = new EngineerTotalDoors()
  lossofcan = new LossOfCan();
  lossofcanArray : LossOfCan[];
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
     public _service: RegistrationService, public _router: Router, private toaster: ToastrService,private route: ActivatedRoute,) { }


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

    this._service.getAlllossofcan(this.siteid).subscribe(
      data => {
       if(data!=null)
       {
        // this.engineerSitearray=data;
         console.log("the respose is ",data)
         this.lossofcanArray=data;
         for (let i = 0; i < this.lossofcanArray.length; i++) {
           let door = this.lossofcanArray[i].activatedondoor;
           let relay1 = this.lossofcanArray[i].lockrelay1;
           let relay2 = this.lossofcanArray[i].lockrelay2;
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
    this.lossofcan.activatedondoor=Number(value.concat(val))
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
      this.lossofcan.lockrelay1='Enable';
      this.lossofcan.lockrelay2='Disable';
    }
    else{
      this.lossofcan.lockrelay2='Enable';
      this.lossofcan.lockrelay1='Disable';

    }
    console.log("this.powerOnReset.lockrelay1",this.lossofcan.lockrelay1)
    console.log("this.powerOnReset.lockrelay2",this.lossofcan.lockrelay2)

  }
  addDoor(i,siteid)
  {
    console.log("siteid is",siteid)
    // this.powerOnReset.lockrelay1=this.doorSystemselection;
    // this.powerOnReset.lockrelay12=this.doorSystemselection;
    //this.powerOnReset.siteid=siteid;
    console.log("the object is ",this.lossofcan);
    this._service.AddLossofcan(siteid,this.lossofcan).subscribe(
      data => {
       if(data!=null)
       {
        // this.engineerSitearray=data;
         console.log("the respose is ",data)
         this.toaster.success("Power On Reset for door created")
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
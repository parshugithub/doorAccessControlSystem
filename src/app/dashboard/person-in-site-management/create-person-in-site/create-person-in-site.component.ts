
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { ToastrService } from 'ngx-toastr';
import { Channel } from 'src/app/modal/channel';
import { Person } from 'src/app/modal/person';
import { PersonClass } from 'src/app/modal/person-class';
import { PersonTags } from 'src/app/modal/person-tags';
import { Property } from 'src/app/modal/property';
import { ScheduleMain } from 'src/app/modal/schedule-main';
import { Site } from 'src/app/modal/sitemodal';
import { PersonInSiteService } from 'src/app/service/person-in-site.service';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-person-in-site',
  templateUrl: './create-person-in-site.component.html',
  styleUrls: ['./create-person-in-site.component.scss']
})
export class CreatePersonInSiteComponent implements OnInit {
  minDate: Date = new Date();
  siteList: Site[] = [];
siteSelect:any;
  personMinDate: Date = new Date();
  personclassId:any;
  personclassone=new PersonClass();
  personTags=new PersonTags();
tagColorData:any;
personTagExpiry:any;
personExpiryDate:any;
personsSchedule: ScheduleMain[] = [];
scheduleMain = new ScheduleMain();
selectedScheduleIds = [];
personCreateDate:any;
// selectedFinalScheduleIds=[];
schedule=[];
flatnumbervalue:any;
  show = false;
  finalflat:any;
  hide: any;
  date: Date;
  flatNumberList:any;
  flatList:any=[];
  selectedFlatNumber:any;
  property: Property[] = [];
  properties=new Property()
channel:Channel[]=[];
  showTag = false;
  hideTag: any;
  expanded = false;
  flats = [];
  selectedFlats = [];
//selectedFlats:[] = [] 
   arr = new Array();


example=[];
  toggle() {
  this.show = !this.show

  if(this.show) {
  console.log(this.show)
  }
  else {
  }
  }
addTag(){
  this.showTag = !this.showTag
  if(this.showTag) {
    // this.buttonName = 'Hide'
    console.log(this.showTag)
    }
    else {
    // this.buttonName = 'Show'
    }
}


  data = JSON.parse(localStorage.getItem("acesscontroldata"));
  site = new Site();
  siteid:number;
  id:number;
  msg = '';
  personclass: any = [];
  personclassArray: PersonClass[];

  person = new Person();
  
  persontypes = [
    {
      id: "ma",
      name: "male"
    },
    {
      id: "fe",
      name: "female"
    }
   
  ];

  gender = "male";
  compareFn(c1: PersonType, c2: PersonType): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(public userService: UserService,public siteManagementservice:SitemanagementService,private router: Router,private route: ActivatedRoute,public datepipe: DatePipe,private toaster:ToastrService,
    public personInSiteService: PersonInSiteService,public vcRef: ViewContainerRef, private cpService: ColorPickerService) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

//     this.site = new Site();
//     this.siteid = this.route.snapshot.params['siteid'];
// console.log("this is site id",this.siteid);

// this.personInSiteService.getSchedueles(data.id,this.siteid).subscribe((response: ScheduleMain[]) => {
//   console.log("the sch group ", response)

//   this.personsSchedule = response;

//   console.log("this djbcdjcbdc",this.personsSchedule)
//   })
this.allSites();
this.getFlat();
this.date = new Date();
this.personCreateDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');

  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


    public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  public arrayColors: any = {
    color1: '#28e95a',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };

  public selectedColor: string = 'color1';

  public color1: string = '#28e95a';
  public color2: string = '#e920e9';
  public color3: string = '#fff500';
  public color4: string = 'rgb(236,64,64)';
  public color5: string = 'rgba(45,208,45,1)';
  public color6: string = '#1973c0';
  public color7: string = '#f200bd';
  public color8: string = '#a8ff00';
  public color9: string = '#278ce2';
  public color10: string = '#0a6211';
  public color11: string = '#f2ff00';
  public color12: string = '#f200bd';
  public color13: string = 'rgba(0,255,0,0.5)';
  public color14: string = 'rgb(0,255,255)';
  public color15: string = 'rgb(255,0,0)';
  public color16: string = '#a51ad633';
  public color17: string = '#666666';
  public color18: string = '#ff0000';

  public cmykValue: string = '';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  public onEventLog(event: string, colorCodeData: any): void {
    console.log(event, colorCodeData);
    console.log("this is for color code",colorCodeData)
    this.tagColorData=colorCodeData;
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }

testTag(){
  console.log("this is for tag set testing")
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

settingTagForPerson(){
  console.log("this is for the setting the tag",this.tagColorData);
  console.log("this is for person tags",this.personTags)
  this.personTags.tagcolor=this.tagColorData;
  let x = (<HTMLInputElement>document.getElementById("datevalue")).value;
  this.personTagExpiry=this.datepipe.transform(x, 'dd-MM-yyyy hh:mm:ss');
  this.personTags.tagExpiray=this.personTagExpiry;
  console.log("wefbhefbehfber",this.personTags);
  this.personInSiteService.settingPersonTagForSite(this.personTags).subscribe(
  (res) => {
  this.personTags.tagExpiray = x;
  (<HTMLInputElement>document.getElementById("datevalue")).value = this.personTags.tagExpiray;
  this.msg='Tag Code created successfully';
  this.toaster.success(this.msg);
  
  },
  error => {
  console.log("error exception");
  }
  )
  }

getFlat(){
//   let data = JSON.parse(localStorage.getItem("acesscontroldata"));

//   this.siteid = this.route.snapshot.params['siteid'];

//   this.personInSiteService.gettingFlatNumber(data.id,this.siteid).subscribe((channelResponse: Property[])=>{
//     console.log("this i for getiing channel response",channelResponse)
//     this.flatList=channelResponse;
// this.flatNumberList= this.flatList.map(t=>t.flat);

// console.log("wefwefwe",this.flatNumberList)
    
//   }) 
}

checked(flat){
  if(this.selectedFlats.indexOf(flat) != -1){
    console.log("edhvced",flat)
    return true;
  }
}
getFlatSelect(checked, flat){
  if(checked){
    console.log("dbcdhcbdchd",flat)
      this.properties.flatnumber=flat;
    //  this.example.push(flat);
    const personClassdxIdCopy = Object.assign({}, this.properties);

   console.log("this is forselectededfedfe ", personClassdxIdCopy)

     this.arr.push(personClassdxIdCopy);
     this.selectedFlats.unshift(personClassdxIdCopy)
    
     console.log("this is forselected ",  this.selectedFlats)

  } else {
    this.selectedFlats.splice(this.selectedFlats.indexOf(flat), 1)
  }
}
showCheckboxes() {
  // console.log("this is for channel response", this.channelResponse);
  // this.flatList = this.channelResponse;
  this.flatNumberList = this.flatList.map(t => t.flat);
  // console.log("this is for ertgergrger response", this.flatNumberList);
  
  var checkboxes = document.getElementById("checkboxes");
  if (!this.expanded) {
//     let x3 = (<HTMLInputElement>document.getElementById("one")).value;
// console.log("this is selected x3 values",x3)
    checkboxes.style.display = "block";
    this.expanded = true;
  } else {
    checkboxes.style.display = "none";
    this.expanded = false;
  }
}
checkedSchedul(scheduleId) {
  if (this.selectedScheduleIds.indexOf(scheduleId) != -1) {
    return true;
  }
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




  createPerson() {
    console.log("qwdubwqdwq",)
let x2 = (<HTMLInputElement>document.getElementById("dateExpiry")).value;
this.person.firstName=(<HTMLInputElement>document.getElementById("FirstName")).value;
this.person.lastName=(<HTMLInputElement>document.getElementById("LastName")).value;
this.person.mobileNumber=(<HTMLInputElement>document.getElementById("mobile")).value;

this.person.address1=(<HTMLInputElement>document.getElementById("Address1")).value;
this.person.address2=(<HTMLInputElement>document.getElementById("Address2")).value;


this.person.areaCode=(<HTMLInputElement>document.getElementById("areacode")).value;
this.person.sipurl=(<HTMLInputElement>document.getElementById("sipurl")).value;

this.person.email=(<HTMLInputElement>document.getElementById("email")).value;
this.person.city=(<HTMLInputElement>document.getElementById("city")).value;
this.person.state=(<HTMLInputElement>document.getElementById("state")).value;
this.person.country=(<HTMLInputElement>document.getElementById("country")).value;
this.person.tradeCode=parseInt((<HTMLInputElement>document.getElementById("exampleInputEmail2")).value);


console.log("this is for uefuefef",this.siteSelect)
this.personExpiryDate=this.datepipe.transform(x2, 'yyyy-MM-dd hh:mm:ss');
this.person.expiraydate=this.personExpiryDate;
 this.person.createddate=this.personCreateDate;
 this.personclassId=this.person.personclassone;
 console.log("refugwfyewfew",this.personclassId)
  this.personclassone.pclassid=this.personclassId;
const personClassIdCopy = Object.assign({}, this.personclassone);
console.log("this is for person class one",personClassIdCopy)
this.person.personclassone=personClassIdCopy;
this.person.propery=this.selectedFlats;
this.person.schedule=this.selectedScheduleIds;
console.log("this is for person",this.person);
let data = JSON.parse(localStorage.getItem("acesscontroldata"));
console.log("thwqdydw",data.id)
    this.personInSiteService.createPersonInSite(data.id,this.siteSelect.siteid,this.person).subscribe(
      (res) => {
        console.log("this is the person response",res);
        this.msg='Person created successfully';
        this.toaster.success(this.msg);
        this.router.navigate(['person-management']);

      },
      error => {
        console.log("error exception");
      }
    )
  }

  goBack() {
    this.router.navigate(['person-management'])
  }
  getPersonToMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      console.log("getting site", dataList);
      this.siteSelect=dataList;
      let data = JSON.parse(localStorage.getItem("acesscontroldata"));

        this.personInSiteService.gettingFlatNumber(data.id,this.siteSelect.siteid).subscribe((channelResponse: Property[])=>{
    console.log("this i for getiing channel response",channelResponse)
    this.flatList=channelResponse;
this.flatNumberList= this.flatList.map(t=>t.flat);

console.log("wefwefwe",this.flatNumberList)
    
  })
  this.personInSiteService.getPersonClassForSite(data.id,this.siteSelect.siteid).subscribe((res: PersonClass[])=>{
    this.personclassArray=res;
    console.log("we are using person class list",this.personclassArray);
  })
  this.personInSiteService.getSchedueles(data.id,this.siteSelect.siteid).subscribe((response: ScheduleMain[]) => {
    console.log("the sch group ", response)
  
    this.personsSchedule = response;
  
    console.log("this djbcdjcbdc",this.personsSchedule)
    }) 
    }, error => console.log(error));
  console.log(this.site)
  
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

let siteid= this.siteSelect;
console.log("this is for siteit",siteid)



  }

  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }




}


interface PersonType{
  id:string;
  name:string;
}

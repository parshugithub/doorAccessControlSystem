import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { ToastrService } from 'ngx-toastr';
import { Createuser } from 'src/app/modal/createuser';
import { Person } from 'src/app/modal/person';
import { PersonClass } from 'src/app/modal/person-class';
import { PersonTags } from 'src/app/modal/person-tags';
import { Property } from 'src/app/modal/property';
import { ScheduleMain } from 'src/app/modal/schedule-main';
import { Site } from 'src/app/modal/sitemodal';
import { PersonService } from 'src/app/service/person.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {
  site = new Site();
  siteid:number;
  schedule=[];

  show = false;
  showTag = false;
  minDate: Date = new Date();
  personMinDate: Date = new Date();
  tagColorData:any;
  selectedFlats = [];
  arr = new Array();
  personTags=new PersonTags();
  personTagExpiry:any;
  personsSchedule: ScheduleMain[] = [];
  personclassone=new PersonClass();
  selectedScheduleIds = [];
  personid: number;
  person = new Person();
  msg='';
  personclassId:any;
  flatNumberList:any;
  flatList:any=[];
  scheduleMain = new ScheduleMain();
  personclassArray: PersonClass[];
  property: Property[] = [];
  properties=new Property()

  personExpiryDate:any;
  //personsSchedule: ScheduleMain[] = [];
 // scheduleMain = new ScheduleMain();
  //selectedScheduleIds = [];
  // selectedFinalScheduleIds=[];
  
  flatnumbervalue:any;
    //show = false;
    finalflat:any;
    hide: any;
    expanded = false;
   // flatNumberList:any;
    //flatList:any=[];
 
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
    
  
  constructor( public userService: UserService,private router: Router,private route: ActivatedRoute,public datepipe: DatePipe,private personService:PersonService,private toaster:ToastrService,private cpService: ColorPickerService) { }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let siteid=JSON.parse(localStorage.getItem("siteid"));
    this.person = new Person();
    this.personid = this.route.snapshot.params['personid'];
console.log("this is person id",this.personid);
this.personService.getPerson(this.personid)
  .subscribe(data => {
    console.log("getting person", data)
    this.updateSinglePerson(data);
  }, error => console.log(error));
console.log(this.person);
this.personService.getPersonClass(data.id).subscribe((res: PersonClass[])=>{
  this.personclassArray=res;
  console.log("we are using person class list",this.personclassArray);
})
this.personService.getSchedueles(data.id,siteid).subscribe((response: ScheduleMain[]) => {
  console.log("the sch group ", response)

  this.personsSchedule = response;

  console.log("this djbcdjcbdc",this.personsSchedule)
  })

this.getFlat();
this.userService.getIpAddress().subscribe((IPAddress: Createuser[])=>{     
  console.log("this is the response for ip address active or not",IPAddress);
})
  }

  numbersOnly(event): boolean {
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

  settingTagForPerson(){
    console.log("this is for the setting the tag",this.tagColorData);
    console.log("this is for person tags",this.personTags)
    this.personTags.tagcolor=this.tagColorData;
    let x = (<HTMLInputElement>document.getElementById("datevalue")).value;
    this.personTagExpiry=this.datepipe.transform(x, 'dd-MM-yyyy hh:mm:ss');
    this.personTags.tagExpiray=this.personTagExpiry;
  console.log("wefbhefbehfber",this.personTags);
    this.personService.settingPersonTag(this.personTags).subscribe(
      (res) => {
        this.msg='Tag Code created successfully';
        this.toaster.success(this.msg);
      },
      error => {
        console.log("error exception");
      }
    )
  }
  

  settingTag(){
    console.log("this is for the setting the tag",this.tagColorData);
    console.log("this is for person tags",this.personTags)
    this.personTags.tagcolor=this.tagColorData;
    let x = (<HTMLInputElement>document.getElementById("datevalue")).value;
    this.personTagExpiry=this.datepipe.transform(x, 'yyyy-MM-dd hh:mm:ss');
    this.personTags.tagExpiray=this.personTagExpiry;
  console.log("wefbhefbehfber",this.personTags);
    this.personService.settingPersonTag(this.personTags).subscribe(
      (res) => {
        console.log("this is the peson tag code response",res);
      
      },
      error => {
        console.log("error exception");
      }
    )
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
  
  getFlat(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
let siteid=JSON.parse(localStorage.getItem("siteid"));
console.log("this is the site id",siteid)
    // this.siteid = this.route.snapshot.params['siteid'];
    this.personService.gettingFlatNumber(data.id,siteid).subscribe((channelResponse: Property[])=>{
      console.log("this i for getiing channel response",channelResponse)
      this.flatList=channelResponse;
  this.flatNumberList= this.flatList.map(t=>t.flat);
  
  console.log("wefwefwe",this.flatNumberList)
      
    }) 
  }

  updateSinglePerson(person) {
    console.log("update user",person)
    this.person = person;
  }
  onSubmit() {
    this.updatePerson();    
  }
  
  updatePerson(){
    console.log("called")
    console.log(this.person);
   // console.log("this is customer id",this.data.id)
let x2 = (<HTMLInputElement>document.getElementById("dateExpiry")).value;
this.personExpiryDate=this.datepipe.transform(x2, 'yyyy-MM-dd hh:mm:ss');
this.person.expiraydate=this.personExpiryDate;
console.log("this is for person class id purpose",this.person.personclassone);
 this.personclassId=this.person.personclassone;
  this.personclassone.personclassid=this.personclassId;
console.log("this is for final person creation object",this.personclassone);
const personClassIdCopy = Object.assign({}, this.personclassone);
console.log("experment",personClassIdCopy); // { a: 1 }
this.person.personclassone=personClassIdCopy;
console.log("this is for final person creation object",this.person);
console.log("this is site id",this.siteid);
// this.flats.push(this.selected.sort());
this.person.propery=this.selectedFlats;
this.person.schedule=this.selectedScheduleIds;
    this.personService.updatePersonData(this.personid,this.person).subscribe(
      (res) => {
      this.router.navigate(['/persons',this.personid]);
        console.log("this is peerson updated successfully",res);
        this.msg='successfully person updated';
        this.toaster.success(this.msg);
        this.siteid = JSON.parse(localStorage.getItem("siteid"));
        this.person.expiraydate = new Date((this.person.expiraydate)).toISOString().substr(0, 16);
        this.router.navigate(['/persons',this.siteid]);
      },
      error => {
        console.log("error exception");
      this.msg = error.error;
      this.toaster.error(this.msg);

      }
    )
  }
  
  getScheduleForPerson(j,scheduleidval,checked)
  {
    if(checked){
  
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



  

  goBack() {
    this.siteid = JSON.parse(localStorage.getItem("siteid"));

    
    this.router.navigate(['dashboard/persons',this.siteid]);
    localStorage.removeItem('siteid');

  }
}

interface PersonType{
  id:string;
  name:string;
}
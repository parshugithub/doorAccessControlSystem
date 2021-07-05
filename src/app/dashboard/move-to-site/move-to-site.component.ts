import { Component, OnInit, VERSION, ViewChild,ViewContainerRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleMain } from 'src/app/modal/schedule-main';
import { Shedule } from 'src/app/modal/shedule';
import { Site } from 'src/app/modal/sitemodal';
import { Staff } from 'src/app/modal/staff';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { StaffService } from 'src/app/service/staff.service';
import { DatePipe } from '@angular/common';
import { StaffAccess } from 'src/app/modal/staff-access';
import { Accesslevel } from 'src/app/modal/accesslevel';
import { ThrowStmt } from '@angular/compiler';
import { EnableDateAndTime } from 'src/app/modal/enable-date-and-time';
import { TradeCodesAndDoor } from 'src/app/modal/trade-codes-and-door';
import { Door } from 'src/app/modal/door';
import { Channel } from 'src/app/modal/channel';
import { TradeCodesWithDoor } from 'src/app/modal/trade-codes-with-door';
import { Tag } from 'src/app/modal/tag';
import { ScheduleDays } from 'src/app/modal/schedule-days';
import { ScheduleDay } from 'src/app/modal/scheduledays';
import { ToastrService } from 'ngx-toastr';
import { Createuser } from 'src/app/modal/createuser';
import { UserService } from 'src/app/service/user.service';
import { stringify } from 'querystring';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'app-move-to-site',
  templateUrl: './move-to-site.component.html',
  styleUrls: ['./move-to-site.component.scss'],

})
export class MoveToSiteComponent implements OnInit {
  public color1: string = '#2889e9';
  tagColorData:any;
  arralenghth: any;

  login_form: FormGroup;
  tagsChannelArrayRefer:any=[]
  endTimeArray:any=[];
  EndMinuteArray:any=[];
  EndHourArray:any=[];
  accessTime:any;
  startTimeArray: any = [];
  StartHourArray: any = [];
  StartMinuteArray: any = [];
  channelTagArray: any = [];
  previousTarget = null;
  totalDoors: any = [];
  scheduleFirst: any;
  scheduleEndOne: any;
  scheduleEndTwo: any;
  scheduleIdReference: any;
  scheduleRefer:any;
  tradeCodeWithSchedule: any;
  tradeCodewithCreatedDate: any;
  channelFlat: any;
  channelPP: any;
  channelTag: any;
  channelCreatedDate: any;
  referedtag:any;
  beforeHexa: any;
  singledoor: any;
  singleday: any;
  hexavalue: any;
  hexarespose: any;
  staffAccessLevelValue: any;
  scheduleSecond: any;
  doors = new Door();
  tradeCodeNumber: any;
  tradeCodeSchedule: any;
  tradeCodeUpdatedDate: any;
  tradeid: any;
  staffAccessAndOptionsId: any;
  tags = new Tag();
  clickDate = "";
  clickDateIndia = "";
  staffAccessid: any;
  latest_date = "";
  startHoursTime = "";
  minutesTime = "";
  daySelect = "";
  endHoursTime = "";
  endminutesTime = "";
  sheduleDate1 = Date.now();
  referDate: any;
  isClicked: boolean = false;
  tradeDate: any;
  merged: any;
  staffAccessAnyValue: any;
  referenceIndiaTime: any;
  tradeWithLockTime: any;
  tradeDoorId: any;
  referDay: any;
  tradeCode1: any;
  selectDay = "";
  tradeCode2: any;
  scheduleId2: any;;
  scheduleId1: any;
  doonumber: any;
  shDate1 = ""
  staffAccess = new StaffAccess();
  enableDateAndTimeObj = new EnableDateAndTime();
  tradeCodesAndDoorObj = new TradeCodesAndDoor();
  tradeCodesWithDoorObj = new TradeCodesWithDoor()
  sheduleMain = new ScheduleMain();
  selectedDayArray: any = [];
  trade: TradeCodesAndDoor[] = [];
  tagrfid:any;
  doorsArrayReference:any
  id: number;
  hourValue: any;
  accesslevel: any;
  accessingStaffId: any;
  accessStaffArray: any;
  accessingDoors: any;
  accessDoor: any;
  accessingDoorNumber: any = [];
  accessLevelReference: any;
  schedulestartReference: any;
  scheduleendReference: any;
  scheduleDaysReference: any;
  scheduleDateReference: any;
  passNumberReference: any;
  updatedDateReference: any;
  custid: number;
  siteid: number;
  start: Date
  myDate = Date.now();    //date 
  updatedDate = Date.now();
  site = new Site();
  accessingData: any;
  doorsArray: Door[] = [];

  msg = '';
  data: any;
  firstOne;
  numberOfTags: number[] = new Array(5)

  totalChannlesArray: number[] = new Array(16);
  totalSchedules: number[] = new Array(32);
  totalTradeCodes: number[] = new Array(16);
  totalDoorsRefer: number[] = new Array(128);
  totalStaffAccessAndOptions: number[] = new Array(32);
  totalTradeCodeAndDoors: TradeCodesAndDoor[] = [];
  totalTradeCodeWithDoors: TradeCodesWithDoor[] = [];
  totalChannels: Channel[] = [];
  totalStaffAccess: StaffAccess[] = [];

  selectedDoors: any = [];
  selecteddays: any[] = new Array();
  selectedTags: any = [];
  allTags: any = [];
  allDoors: any = [];
  hoursArray: Shedule[] = [];
  minutesArray: Shedule[] = [];
  daysArray: Shedule[] = [];
  accessType: Accesslevel[] = [];
  SchedulesArray: ScheduleMain[] = [];
  channles = new Channel();

  title = "sgxvsxgs"
  channelsvalues = "";
  channelsname: number;
  tradeName: number;
  flat: any;
  ppp: any;
  door1: any;
  tagNumber: any;
  tagValue: any;
  channelReference:any;
  datevalue: any;
  dateScheduleValue: any;
  tradeCodeReferenceId:any;
  date: Date;
  flag: boolean = true;
  daysflag: boolean = true;
  colorvalue: any;
  toggle: boolean;

  constructor(public userService: UserService, public vcRef: ViewContainerRef, 
    private cpService: ColorPickerService, private moveToSite: MoveToSiteService, private route: ActivatedRoute, private toaster: ToastrService,
    private router: Router, public StaffManagementservice: StaffService, public datepipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.site = new Site();
    this.id = this.route.snapshot.params['siteid'];
    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    
    this.makeChannels();
    this.getHours();
    this.getMinutes();
    this.getDays();
    this.getAccess();
    this.getAllTradeCodes();
    this.getAllTradeCodeWithDoors();
    this.getAllStaffAccess();
    this.getSchedules();
    this.getChannels();
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      this.totalDoors = Response;
      this.accessingDoorNumber = this.totalDoors.map(t => t.doorName);
      this.doorsArray = this.accessingDoorNumber;

    })
    // this.getAllTrades();
    this.StaffManagementservice.getAll(this.data.id).subscribe((response: Staff[]) => {
      this.accessStaffArray = response;
      this.accessingStaffId = this.accessStaffArray.map(t => t.staffid);
      this.date = new Date();
      this.tradeDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');

    })

    for (let i = 0; i < this.totalChannlesArray.length; i++) {
      this.totalChannlesArray[i]= i;
      
    }
    this.arralenghth= this.totalChannlesArray.length;


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

  // public color1: string = '#6a99e1ff';
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
  public onEventLog(event: string, colorCodeData: any,j,i): void {

    this.tagColorData=colorCodeData;
  }

  public onChangeColorCmyk(color: string,j,i): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string,j,i): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }


  doorsFormArray: Array<any> = [];
 
  onChangeCat(Door:string, isChecked: boolean,k) {
      if(isChecked) {
        this.moveToSite.getSingleDoor(Door).subscribe((Response: Door) => {
          this.singledoor = Response;
          this.selectedDoors.push(this.singledoor)
          var n = this.selectedDoors.includes(this.singledoor);
    
        })
      } else {
        let index = this.selectedDoors.indexOf(Door,k);
        this.selectedDoors.splice(index,1);
       

      }
  }

  








  getTags() {
    for (let i = 0; i < this.numberOfTags.length; i++) {
      this.numberOfTags[i] = i;
    }
  }

  makeChannels() {
    for (let i = 0; i < this.totalChannlesArray.length; i++) {
      this.totalChannlesArray[i] = i;
    }


  }

  
  makeStaffAccess() {
    for (let i = 0; i < this.totalStaffAccessAndOptions.length; i++) {
      this.totalStaffAccessAndOptions[i] = i;
    }


  }

  makeDoors() {
    for (let i = 0; i < this.totalDoorsRefer.length; i++) {
      this.totalDoorsRefer[i] = i;
    }


  }



  makeSchedules() {
    for (let i = 0; i < this.totalSchedules.length; i++) {
      this.totalSchedules[i] = i;
    }


  }


  makeTradeCode() {
    for (let i = 0; i < this.totalTradeCodes.length; i++) {
      this.totalTradeCodes[i] = i;
      

    }
  }

  convertHexadecimal(event, value1, j, i) {
    if (event.target.checked) {
      this.beforeHexa = value1;
      this.moveToSite.convertHexa(value1).subscribe((Response: Tag) => {
        this.hexavalue = Response;
        this.hexarespose = this.hexavalue.hexaval;
        (<HTMLInputElement>document.getElementById("tagname" + j + i)).value = this.hexarespose;

      });

    }
    else {

      (<HTMLInputElement>document.getElementById("tagname" + j + i)).value = this.beforeHexa;

    }

  }

  getAllTradeCodes() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let siteid=this.route.snapshot.params['siteid']
    this.moveToSite.getAllTradeCodes(data.id,siteid).subscribe((Response: TradeCodesAndDoor[]) => {
      this.totalTradeCodeAndDoors = Response;
      for (let i = 0; i < this.totalTradeCodeAndDoors.length; i++) {
        this.totalTradeCodeAndDoors[i];
        let tradeIdRefer=this.totalTradeCodeAndDoors[i].tradeNo;
        this.tradeCodeNumber = this.totalTradeCodeAndDoors[i].tradecode;
        this.tradeCodeSchedule = this.totalTradeCodeAndDoors[i].scheduleno;
        this.tradeCodeUpdatedDate = this.totalTradeCodeAndDoors[i].createdDate;
        (<HTMLInputElement>document.getElementById("tradeS" +(tradeIdRefer-1))).value = this.tradeCodeSchedule;
        (<HTMLInputElement>document.getElementById("tradeC" +(tradeIdRefer-1))).value = this.tradeCodeNumber;
        (<HTMLInputElement>document.getElementById("tradeUpdateDate" +(tradeIdRefer-1))).value = this.tradeCodeUpdatedDate;

      }
    })
  }
  createTradeCode(i) {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.siteid = this.route.snapshot.params['siteid'];
    this.tradeCodesAndDoorObj.createdDate = this.tradeDate;
    // this.flat = (<HTMLInputElement>document.getElementById("txtFlat" + i)).value
    // console.log("the x valu", this.flat);
    this.tradeid = (<HTMLInputElement>document.getElementById("tradecodeid" + i)).textContent;
    this.tradeCode1 = (<HTMLInputElement>document.getElementById("tradeC" + i)).value
    this.tradeCodesAndDoorObj.tradecode = this.tradeCode1;
    this.scheduleId1 = (<HTMLInputElement>document.getElementById("tradeS" + i)).value
    this.tradeCodesAndDoorObj.scheduleno = this.scheduleId1;

    this.moveToSite.createTradeAndDoor(data.id, this.siteid, this.tradeid, this.tradeCodesAndDoorObj).subscribe(
      (res) => {
        console.log(res);
        this.msg = 'Programming Trade Code';
        this.toaster.success(this.msg);
        this.getAllTradeCodes();
      },
      error => {
        this.msg = "Schedule is not created";
        this.toaster.error(this.msg);
      }
    )
  }



  getAllTradeCodeWithDoors() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let siteid=this.route.snapshot.params['siteid']

    this.moveToSite.getAllTradewithDoor(data.id,siteid).subscribe((Response: TradeCodesWithDoor[]) => {
      this.totalTradeCodeWithDoors = Response;
      for (let i = 0; i < this.totalTradeCodeWithDoors.length; i++) {
        this.totalTradeCodeWithDoors[i];
        let doorNameReference=this.totalTradeCodeWithDoors[i].doorNumber;


        this.tradeWithLockTime = this.totalTradeCodeWithDoors[i].lockTime;
        this.tradeCodeWithSchedule = this.totalTradeCodeWithDoors[i].scheduleno;
        this.tradeCodewithCreatedDate = this.totalTradeCodeWithDoors[i].createdDate
        console.log("the locaktime", this.tradeWithLockTime, "schecule", this.tradeCodeWithSchedule);
        (<HTMLInputElement>document.getElementById("LockTime" +(doorNameReference-1))).value = this.tradeWithLockTime;
        (<HTMLInputElement>document.getElementById("tradeWithS" +(doorNameReference-1))).value = this.tradeCodeWithSchedule;
        (<HTMLInputElement>document.getElementById("tradedateval" +(doorNameReference-1))).value = this.tradeCodewithCreatedDate;
      }
    })
  }




  createTradeCodeDoor(i) {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.siteid = this.route.snapshot.params['siteid'];

    this.tradeCodesWithDoorObj.createdDate = this.tradeDate;
    // this.tradeDoorId=(<HTMLInputElement>document.getElementById("tradecodewithid"+i)).value;
    this.tradeDoorId = i + 1;
    this.doonumber = i + 1;
    // this.accessingDoorNumber=i+1;
    this.tradeCode2 = (<HTMLInputElement>document.getElementById("LockTime" + i)).value;
    this.tradeCodesWithDoorObj.lockTime = this.tradeCode2;
    this.scheduleId2 = (<HTMLInputElement>document.getElementById("tradeWithS" + i)).value;
    this.tradeCodesWithDoorObj.scheduleno = this.scheduleId2;
    this.tradeCodesWithDoorObj.doorNumber = this.doonumber;

    this.moveToSite.createTradeWithDoor(data.id, this.siteid, this.tradeDoorId, this.tradeCodesWithDoorObj).subscribe(
      (res) => {
        console.log(res);
        this.msg = 'Programming Door';
        this.toaster.success(this.msg);
        this.getAllTradeCodeWithDoors();
      },
      error => {
        this.msg="The Schedule is not created present"
        this.toaster.error(this.msg);

      }
    )
  }

numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  

  @ViewChild('myDiv') myDiv: ElementRef;


  onLockKey(event, i) {
  }
  onScheduleWithKey(event, i) {

  }

  // changeColor(door, k, i) {
  //   if (this.flag == true) {
  //     console.log("if flag 1 ", this.flag)
  //     this.flag = false;
  //     console.log(" if called");
  //     this.colorvalue = (<HTMLInputElement>document.getElementById("door" +k)).style.backgroundColor = "lightgreen";
  //     console.log("if flag 2", this.flag)
  //     this.flag = false;


  //   }
  //   else {
  //     console.log("else flag 1", this.flag)
  //     this.flag = true;
  //     console.log(" another if called");
  //     this.colorvalue = (<HTMLInputElement>document.getElementById("door" + k)).style.backgroundColor = "";
  //     this.flag = true;
  //     console.log("else flag 2", this.flag)

  //   }
  //   if (this.colorvalue == 'lightgreen') {
  //     this.onAdd(door, i)
  //   }

  // }

  changeColorForDays(day, k, i) {
    if (this.daysflag == true) {
     
      this.colorvalue = (<HTMLInputElement>document.getElementById("days" + i + k)).style.backgroundColor = "";
      
      this.daysflag = false;


    }
    else {
      this.daysflag = true;
      this.colorvalue = (<HTMLInputElement>document.getElementById("days" + i + k)).style.backgroundColor = "#6a99e1ff";

      this.daysflag = true;

    }
    if (this.colorvalue == '#6a99e1ff') {
      this.onAddDays(day, i,k);
    }
    else{
      this.onAddDays(day, i,k);
    }
  }
  onAddDays(day, i,k) {

    for (let j = i; j <= i; j++) 
      {
        let values= (<HTMLInputElement>document.getElementById("days" + i + k)).value;
    //  let days= (<HTMLInputElement>document.getElementById("days" + i + j)).style.backgroundColor
      // if(values=='Su')
      // {
        let su=7
        for(let m=0;m<su;m++)
        {
          let days= (<HTMLInputElement>document.getElementById("days" + i + (m))).style.backgroundColor
         
          if(days=='#6a99e1ff')
          {
            let checkDay= (<HTMLInputElement>document.getElementById("days" + i + (m))).value;
            this.selecteddays.length=0;
         
          // console.log("the result is ",result)
          // if(result) 
          // {
          //   console.log("values already there")
          // }
          // else{
            this.moveToSite.getSingleDay(checkDay).subscribe((dayss: ScheduleDays) => {
              this.singleday = dayss;

              var test = this.selecteddays.includes(this.singleday);
           //  this.selecteddays = [{a: 'b'}];
           //  this.selecteddays.includes( this.selecteddays.find(el=>el.day===this.singleday));
            console.log("jhsdfhsdfhsdk",this.selecteddays.some(item => item.day === this.singleday ))
             // var result= this. selecteddays.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(this.singleday.toLowerCase()) !== -1);
              //  if( result){
              // console.log("values already there")
              //  }
              //  else{
                // for (let index = 0; index < this.selecteddays.length; index++) 
                // {
                //   console.log("kssdjhsdhsd")
                //   const element = this.selecteddays[index];
                  
                // }
              this.selecteddays.push(this.singleday )
              // }
            })
          
         }
         else{
         }
          }
        
      }
    }




  init(channelsvalues) {
  }
  selectedTasks = {


  };

  selectedDays = {


  };


  onAdd(door, i) {
    this.moveToSite.getSingleDoor(door).subscribe((Response: Door) => {
      this.singledoor = Response;
      this.selectedDoors.push(this.singledoor)
      var n = this.selectedDoors.includes(this.singledoor);
    })

  }

  setTag(j, i) {
    this.tagNumber = (<HTMLInputElement>document.getElementById("tagid" + j + i)).value
    this.tagValue = (<HTMLInputElement>document.getElementById("tagname" + j + i)).value
    if (this.tagValue == "") {
      alert("Tag Value can not be blank");
    }else{
    var str = this.tagValue.toString();
    str = str.slice(0);
    str = parseInt(str);
    this.tags.tagname = this.tagNumber;
    this.tags.tagRFid = str;
    this.tags.createdDate = this.tradeDate;
    this.tags.updatedDate = this.tradeDate;
    console.log("tags ", this.tags)
    this.moveToSite.createTag(this.tags, this.id, this.data.id).subscribe(
      (res) => {
        this.msg = "Tag created successfully";
        this.toaster.success(this.msg);
        this.allTags.push(res);
      },
      error => {
        this.msg = "internal Server error";
        this.toaster.error(this.msg);
      }
    )
  }
  }


  clear(j, i) {
    alert("Are you Sure you want to Clear the data");
    (<HTMLInputElement>document.getElementById("tagname" + j + i)).value = '';

  }
  onKey(event, i) {

  }

  onScheduleKey(event, i) {
  }
  onScheduleTradeKey(event, i) {

  }

  onChange(event, i) {
  }


  getChannels() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.moveToSite.getAllChannels(data.id, this.id).subscribe((Response: Channel[]) => {
      this.totalChannels = Response;
      for (let i = 0; i < this.totalChannels.length; i++) {
        this.totalChannels[i];
        let channelIdReference=this.totalChannels[i].channel;
         this.tagsChannelArrayRefer.push(channelIdReference);
        this.channelFlat = this.totalChannels[i].flat;
        this.channelPP = this.totalChannels[i].ppp;

        this.channelCreatedDate = this.totalChannels[i].createdDate;

        
        (<HTMLInputElement>document.getElementById("txtFlat" +(channelIdReference - 1))).value = this.channelFlat;
        (<HTMLInputElement>document.getElementById("ppp" +(channelIdReference - 1))).value = this.channelPP;
        (<HTMLInputElement>document.getElementById("channeldatevalue" +(channelIdReference - 1))).value = this.channelCreatedDate;
        let t=0;


        for(let j=0;j<this.totalChannels[i].tags.length;j++)
        {
          t++;
           this.tagrfid=this.tagsChannelArrayRefer[j];
        this.tagrfid=this.totalChannels[i].channel;
         let k=this.tagrfid-1;

        
           var tagcode = this.totalChannels[i].tags[j].tagRFid;
           var tag = tagcode.toString();
          (<HTMLInputElement>document.getElementById("tagname" +j+k)).value =tag;
       
         }
                 
        for(let k=0;k<this.totalChannels[i].door.length;k++)
        {
          let channelRefer=this.totalChannels[i].channel;
     
          let doorNumber = this.totalChannels[i].door[k].doorName;
          var door = doorNumber.toString();
          let k1=doorNumber;

           this.channelReference=(channelRefer-1);

          (<HTMLInputElement>document.getElementById("doorSelected" +this.channelReference+k1));

        }
      }
    })


  }

  createChannel(i) {
    this.flat = (<HTMLInputElement>document.getElementById("txtFlat" + i)).value

    this.ppp = (<HTMLInputElement>document.getElementById("ppp" + i)).value

    this.channelsname = i + 1;
    this.channles.channel = this.channelsname
    this.channles.flat = Number(this.flat);
    this.channles.ppp = Number(this.ppp);
    this.channles.door = this.selectedDoors;
    this.channles.tags = this.allTags;
    this.channles.createdDate = this.tradeDate;

    let siteid=this.route.snapshot.params['siteid']

    this.moveToSite.createChannels(this.data.id,siteid, this.channles).subscribe(
      (res) => {
        console.log(res);
        this.msg = "channel created successfully";
        this.toaster.success(this.msg);
        this.getChannels();
        this.selectedDoors = [];
        this.allTags = [];
      },
      error => {
        this.msg = "Internal Server Error";
        this.toaster.error(this.msg);



      }
    )

  }


  reloadDashboard(){
    window.location.reload();
  
  }


  createSchedule(i) {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.site = new Site();
    this.sheduleMain = new ScheduleMain();
    this.sheduleDate1 = Date.now();    //date 
    this.latest_date = this.datepipe.transform(this.sheduleDate1, 'yyyy-MM-dd hh:mm:ss');

    this.scheduleFirst = (<HTMLInputElement>document.getElementById("scstart" + i)).value
    this.scheduleSecond = (<HTMLInputElement>document.getElementById("scstartone" + i)).value

    this.scheduleEndOne = (<HTMLInputElement>document.getElementById("scsend" + i)).value
    this.scheduleEndTwo = (<HTMLInputElement>document.getElementById("scsendone" + i)).value
    this.scheduleIdReference = (<HTMLInputElement>document.getElementById("scheduleid" + i)).innerHTML;
     this.scheduleRefer=(<HTMLInputElement>document.getElementById("scheduleid" + i)).innerHTML;
    this.dateScheduleValue = (<HTMLInputElement>document.getElementById("scheduledateval" + i)).innerHTML
    this.sheduleMain.startTime = this.scheduleFirst + ":" + this.scheduleSecond;
    this.sheduleMain.endTime = this.scheduleEndOne + ":" + this.scheduleEndTwo;
    this.sheduleMain.createdBy = this.data.firstname + " " + this.data.lastname;
    this.referDate = this.latest_date;
    this.sheduleMain.createdDate = this.referDate;
    this.sheduleMain.days = this.selecteddays;
    this.sheduleMain.schedule=this.scheduleRefer;
    this.siteid = this.id;
    this.moveToSite.create(this.data.id, this.siteid, this.scheduleIdReference, this.sheduleMain,).subscribe(
      (res) => {
        this.msg = 'Programming Schedule Successfully';
        this.toaster.success(this.msg);
        this.getSchedules();
        this.selecteddays = [];
        if(this.msg){this.reloadDashboard();

        }
      },
      error => {
        this.msg = error.error;
      }
    )
  }


  getSchedules() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let siteid=this.route.snapshot.params['siteid']

    this.moveToSite.getAllSchedules(this.data.id,siteid).subscribe((schedules: ScheduleMain[]) => {
    this.SchedulesArray = schedules;
    for (let i = 0; i < this.SchedulesArray.length; i++) {
    let schedulerRefer=this.SchedulesArray[i].schedule;
    
    this.schedulestartReference = this.SchedulesArray[i].startTime;
    this.startTimeArray = this.schedulestartReference.split(":");
    this.StartHourArray.push(this.startTimeArray[0]);
    this.StartMinuteArray.push(this.startTimeArray[1])
    this.scheduleendReference = this.SchedulesArray[i].endTime;
    this.endTimeArray=this.scheduleendReference.split(":");
    this.EndHourArray.push(this.endTimeArray[0]);
    this.EndMinuteArray.push(this.endTimeArray[1])
    this.scheduleDateReference = this.SchedulesArray[i].createdDate;
    
    
    (<HTMLInputElement>document.getElementById("scstart" + (schedulerRefer-1))).value = this.StartHourArray[i];
    (<HTMLInputElement>document.getElementById("scstartone" + (schedulerRefer-1))).value = this.StartMinuteArray[i];
    (<HTMLInputElement>document.getElementById("scsend" + (schedulerRefer-1))).value = this.EndHourArray[i];
    (<HTMLInputElement>document.getElementById("scsendone" + (schedulerRefer-1))).value = this.EndMinuteArray[i];
    (<HTMLInputElement>document.getElementById("scheduledateval" + (schedulerRefer-1))).value = this.scheduleDateReference;
    
    
    for (let j = 0; j < this.SchedulesArray[i].days.length; j++) {
    let element = this.SchedulesArray[i].days[j].day;
  
    let k
    
    if(element=='Mo')
    {
    k=0
    
    }
    else if(element=='Tu')
    {
    k=1
    }
    
    else if(element=='We')
    {
    k=2
    }
    
    else if(element=='Th')
    {
    k=3
    }
    
    else if(element=='Fr')
    {
    k=4
    }
    else if(element=='Sa')
    {
    k=5
    }
    else if(element=='Su')
    {
    k=6
    }
    
    
    
    (<HTMLInputElement>document.getElementById("days" +(schedulerRefer-1)+k)).checked=true;
    (<HTMLInputElement>document.getElementById("days" +(schedulerRefer-1)+k)).style.backgroundColor = "#6a99e1ff";
    
    
    
    }
    
    // for(let n=0; n<this.selecteddays[n].length; n++){
    // console.log("thisis daylength",this.selecteddays[n]);
    // }
    
    // (<HTMLInputElement>document.getElementById("days" + (schedulerRefer-1))).value = this.scheduleDaysReference[i][];
    
    }
    
    })
    }







  // getSchedules() {
  //   this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
  //   console.log("this is customer response", this.data);
  //   console.log("this is customer response id", this.data.id);
  //   let siteid=this.route.snapshot.params['id']
  //   console.log("this is siteids response", siteid);

  //   this.moveToSite.getAllSchedules(this.data.id,siteid).subscribe((schedules: ScheduleMain[]) => {
  //     console.log("this is all schedules", schedules);
  //     this.SchedulesArray = schedules;

  //     for (let i = 0; i < this.SchedulesArray.length; i++) {
  //       this.SchedulesArray[i];
  //       let scheduleIdReference=this.SchedulesArray[i].scheduleId;
  //       console.log("thiserfbehfber", this.SchedulesArray[i]);
  //       this.schedulestartReference = this.SchedulesArray[i].startTime;
  //       this.scheduleendReference = this.SchedulesArray[i].endTime;
  //       this.scheduleDaysReference = this.SchedulesArray[i].days;
  //       this.scheduleDateReference = this.SchedulesArray[i].createdDate;
  //       console.log("this is for start time", this.schedulestartReference);
  //       console.log("this is for end time", this.scheduleendReference);
  //       console.log("this is for days", this.scheduleDaysReference);
  //       console.log("this is for created time", this.scheduleDateReference);
  //       this.startTimeArray = this.schedulestartReference.split(":");
  //       console.log("thuis cdscsdcsd", this.startTimeArray);
  //       console.log("sgdcvsdgcvsd", this.startTimeArray[0])
  //       // var finalstartfirst=this.startTimeArray[0];
  //       // var finalstartsecond=this.startTimeArray[1];

  //       this.StartHourArray.push(this.startTimeArray[0]);
  //       this.StartMinuteArray.push(this.startTimeArray[1])

  //       console.log("this is the new hours array", this.StartHourArray)
  //       console.log("this is the new minutes array", this.StartMinuteArray);

  //       (<HTMLInputElement>document.getElementById("scstart" + i)).value = this.StartHourArray;
  //       (<HTMLInputElement>document.getElementById("scstartone" + i)).value = this.StartMinuteArray;
  //       (<HTMLInputElement>document.getElementById("scheduledateval" + i)).value = this.scheduleDateReference;
  //     }

  //   })
  // }



  getDays() {
    this.moveToSite.getAllDays().subscribe((scheduleDay: Shedule[]) => {
      console.log("this is only total day", scheduleDay);
      this.daysArray = scheduleDay
      console.log("this isn getting days", this.daysArray)

    })
  }



  getHours() {
    this.moveToSite.getAllHoures().subscribe((scheduleHour: Shedule[]) => {
      console.log(scheduleHour);
      this.hoursArray = scheduleHour
      this.hoursArray.forEach(element => {
        
        if(parseInt(JSON.stringify(element),10)<10)
        {
          ('0' + JSON.stringify(element));
        }

      });
       console.log(this.hoursArray)
    })
  }

  getMinutes() {
    this.moveToSite.getAllMinutes().subscribe((scheduleMinute: Shedule[]) => {
      this.minutesArray = scheduleMinute
      console.log(this.minutesArray)
    })
  }



  getAccess() {
    this.moveToSite.getAccessLevels().subscribe((accessLevels: Accesslevel[]) => {
      console.log(accessLevels);
      this.accessType = accessLevels;
      this.accessingData = this.accessType.map(t => t.accesslevel);

    })
  }

  myFunc() {
    (<HTMLInputElement>document.getElementById("trig")).value = this.hourValue;
  }




  getAllStaffAccess() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let siteid=this.route.snapshot.params['siteid']

    this.moveToSite.getAllStaffAccessAndOptions(data.id,siteid).subscribe((Response: StaffAccess[]) => {
      this.totalStaffAccess = Response;
      for (let i = 0; i < this.totalStaffAccess.length; i++) {
        this.totalStaffAccess[i];
        let staffsRefer=this.totalStaffAccess[i].staff;
        this.accessLevelReference = this.totalStaffAccess[i].accessLevel;
        this.passNumberReference = this.totalStaffAccess[i].passnumber;
        this.updatedDateReference = this.totalStaffAccess[i].updatedDate;
        (<HTMLInputElement>document.getElementById("staffA" +(staffsRefer-1))).value = this.accessLevelReference;
        (<HTMLInputElement>document.getElementById("staffP" +(staffsRefer-1))).value = this.passNumberReference;
        (<HTMLInputElement>document.getElementById("staffUpdateDate" +(staffsRefer-1))).value = this.updatedDateReference;
      }
    })
  }





  createAccess(i) {
    this.id = this.route.snapshot.params['siteid'];
    this.siteid = this.id;
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log("this is site id wedweydh", this.siteid)
    console.log("this is staff access", this.staffAccess.staff);
    this.staffAccessAnyValue = (<HTMLInputElement>document.getElementById("staffP" + i)).value;
    this.staffAccessLevelValue = (<HTMLInputElement>document.getElementById("staffA" + i)).value;
    this.staffAccessAndOptionsId = (<HTMLInputElement>document.getElementById("staffaccessid" + i)).textContent;
    console.log("this is the trade code id", this.staffAccessAndOptionsId);

    this.staffAccess.accessLevel = this.staffAccessLevelValue;
    this.staffAccess.passnumber = this.staffAccessAnyValue;

    this.date = new Date();

    this.accessTime  =this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    // console.log("this is for india date ",latest_india_date);
    // (<HTMLInputElement>document.getElementById("datevalIndia")).value = latest_india_date;

    // this.clickDateIndia=latest_india_date;
     this.staffAccess.updatedDate = this.accessTime;
    console.log("this is staff access", this.staffAccess);

    this.moveToSite.createStaffAccess(data.id, this.siteid, this.staffAccessAndOptionsId, this.staffAccess).subscribe(
      (res) => {
        this.msg = "staffAccess created successfully";
        this.toaster.success(this.msg);
        this.getAllStaffAccess();

      },
      error => {
        this.toaster.error(error);
      }
    )

  }

  staffAccessKey(event, i) {
    console.log("this i qwedqwdqwd wedqw", event, i)
  }


  staffPaswsKey(event, i) {
    console.log("this is staff access passnumber", event, i)
  }

  scheduleHoursTime(event, i) {
    console.log("this i qwedqwdqwd wedqw", event, i)
  }

  scheduleMinutesTime(event, i) {
    console.log("this i qwedqwdqwd wedqw", event, i)
  }


  program_all_datetime_site_uk() {
    this.date = new Date();
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log("this customer id", data.id)
    this.site = new Site();
    this.siteid = this.route.snapshot.params['siteid'];
    console.log("this is site id", this.siteid);
    this.clickDate = new DatePipe('en-Us').transform(this.date, 'yyyy-MM-dd hh:mm:ss', 'GMT');
    console.log("this is uk time", this.clickDate);
    // console.log("created object", this.enableDateAndTimeObj)
    // console.log("this is latest date", this.clickDate);
    // console.log("thisd is obnject", this.enableDateAndTimeObj);
    (<HTMLInputElement>document.getElementById("datevaluk")).value = this.clickDate;

    var date1 = (<HTMLInputElement>document.getElementById("datevaluk")).value;
    // console.log("the date is ", date1)
    this.enableDateAndTimeObj.enableDateAndTimeUK = date1;
    // console.log("kdskldjfh ", this.enableDateAndTimeObj.enableDateAndTimeUK)
    // console.log("the main object ", this.enableDateAndTimeObj)

    // 
  }

  program_alldatetime_india() {
    this.date = new Date();

    let latest_india_date =this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    console.log("this is for india date ",latest_india_date);
    (<HTMLInputElement>document.getElementById("datevalIndia")).value = latest_india_date;

    this.clickDateIndia=latest_india_date;
console.log("this is for india time only",this.clickDateIndia)
  }

  program_all_datetime_site() {

    this.date = new Date();
    this.clickDate = new DatePipe('en-Us').transform(this.date, 'yyyy-MM-dd hh:mm:ss', 'GMT+1');
    // this.clickDate =this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    console.log("this is UK  time", this.clickDate);
    // console.log("created object", this.enableDateAndTimeObj)
    // console.log("this is latest date", this.clickDate);
    // console.log("this is object", this.enableDateAndTimeObj);
    (<HTMLInputElement>document.getElementById("dateval")).value = this.clickDate;
    var date1 = (<HTMLInputElement>document.getElementById("dateval")).value;
    // console.log("the date is ", date1)
    this.enableDateAndTimeObj.enableDateAndTime = date1;
    // console.log("kdskldjfh ", this.enableDateAndTimeObj.enableDateAndTime)
    // console.log("the main object ", this.enableDateAndTimeObj)
  }
  retrieve_all_datetime_site() {
    console.log("sdklfjsldkf", this.clickDateIndia)
    this.enableDateAndTimeObj.enableDateAndTimeindia = this.clickDateIndia;
    console.log("the main object ", this.enableDateAndTimeObj)
    this.id = this.siteid;
    this.moveToSite.createEnable(this.data.id, this.siteid, this.enableDateAndTimeObj).subscribe(
      (res) => {
        console.log(res);
        this.msg = 'Retrieving Date and time';
        this.toaster.success(this.msg);
      },
      error => {
        console.log("error exception");
        this.msg = error.error;
      })
  }


  addRow(arraylenght)
  {
    console.log("the array length is ",arraylenght);
    this.totalChannlesArray.length=arraylenght+1;
    this.arralenghth=this.totalChannlesArray.length;
  


  }





}
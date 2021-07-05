import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VoiceOperator } from 'src/app/modal/voice-operator';
import { UserService } from 'src/app/service/user.service';
import { VoiceOperatorService } from 'src/app/service/voice-operator.service';

@Component({
  selector: 'app-voice-operator',
  templateUrl: './voice-operator.component.html',
  styleUrls: ['./voice-operator.component.scss']
})
export class VoiceOperatorComponent implements OnInit {
  voices: VoiceOperator[] = [];
  voiceOperate:any;
  marked = false;
  firstValue = 1;
  secondValue = 0;
  msg='';
  siteid:number;
  accessingVoices:any;
  // isVoice:boolean = false;
  accessingVoice:any;
  finalVoices= new VoiceOperator ();
  voiceUserName:any;
  constructor(public userService: UserService,private voice:VoiceOperatorService,private router: Router,private route: ActivatedRoute,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.siteid = this.route.snapshot.params['siteid'];
console.log("this is the site id",this.siteid)
    this.getAllVoice()
  let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    // console.log("this is user response",data.id); 
    
    
  }

getAllVoice(){
 let  data = JSON.parse(localStorage.getItem("acesscontroldata"));
console.log("this is customer response",data);
  this.voice.getAll(data.id).subscribe((voiceListResponse: VoiceOperator[])=>{

    this.voices=voiceListResponse
    console.log("this is voice operator list",voiceListResponse);
//     this.voices = voiceListResponse;
//     var totalength=voiceListResponse.length;
// console.log("total voice length",totalength)


  })  
}
goBack(){
  let siteInfo = JSON.parse(localStorage.getItem("siteInfo"));
  this.router.navigate(['/dashboard/view-site', siteInfo.siteName])
}

createVoice(event,i){
  let data = JSON.parse(localStorage.getItem("acesscontroldata"));

  this.marked = event.target.checked;
  if (this.marked == true) {
    this.finalVoices.isVoiceOperatot=this.firstValue;

    
    console.log("this is first", this.firstValue);
  } else {
    this.finalVoices.isVoiceOperatot=this.secondValue;
    console.log("this is second", this.secondValue);
  }
this.accessingVoices=this.voices[i]
  console.log("this voice operators list",this.accessingVoices);
  this.voiceOperate=(<HTMLInputElement>document.getElementById("voicetxt" +i)).value;
  console.log("this is erfver", this.voiceOperate);
  this.finalVoices.userName=this.accessingVoices.userName;
  this.finalVoices.firstName=this.accessingVoices.firstName;
  this.finalVoices.lastName=this.accessingVoices.lastName;
  this.finalVoices.address=this.accessingVoices.address;
  this.finalVoices.email=this.accessingVoices.email;
  console.log("this is final voices",this.finalVoices);

  let siteid = this.route.snapshot.paramMap.get('siteid');
  console.log("site id is",siteid);
  this.voice.createVoice(this.finalVoices,siteid,data.id).subscribe(
    (res) => {
      console.log(res);
      this.msg="Voice Operator updated successfully!"
      this.toaster.success( this.msg);
    },
    error => {
      console.log("error exception");
      this.toaster.error(error);
    })
}

}





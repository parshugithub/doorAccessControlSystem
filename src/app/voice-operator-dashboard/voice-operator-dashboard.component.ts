import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-voice-operator-dashboard',
  templateUrl: './voice-operator-dashboard.component.html',
  styleUrls: ['./voice-operator-dashboard.component.scss']
})
export class VoiceOperatorDashboardComponent implements OnInit {
 show:boolean=false;

  @ViewChild('streaming', {static: false}) streamingcanvas: ElementRef; 

  constructor(public userService: UserService) { }
  ngOnInit(): void {
  }

  toggleCalls(){
    this.show=!this.show;
  }
}

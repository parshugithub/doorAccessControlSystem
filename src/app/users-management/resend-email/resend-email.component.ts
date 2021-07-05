import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.scss']
})
export class ResendEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  resendLink(){
    console.log("this is the resend link")
  }
  
}  
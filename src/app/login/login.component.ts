import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { Customer } from '../modal/customer';
import { Createuser } from '../modal/createuser';
import { FormGroup } from '@angular/forms';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Engineer } from '../modal/engineer';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
enggLog:boolean=false;
login:boolean=true;
register:boolean=false;

engineer=new Engineer();
form: FormGroup;
registerDate: any;
date: Date;
signUpButton: any;
forgotReference: any;
signInButton: any;
loggInButton:any;
container: any;
loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
codeReference:any;
customer = new Customer();
user = new Createuser();
createUser = new Createuser();
sourceData;
usersourceData;

msg = '';
message = '';
constructor(public datepipe: DatePipe, public _service: RegistrationService, public _router: Router, private toaster: ToastrService) { }
ngOnInit(): void {
this.login=true;




$(document).ready(function(){
$("div.enggLogin").hide();
$('.login-info-box').fadeOut();
$('.login-show').addClass('show-log-panel');


});
$("#enggAnchor").click(function(){
$("div.login-show.show-log-panel").hide();
$("div.enggLogin").show();
$(".register-info-box").hide();
});


$('.login-reg-panel input[type="radio"]').on('change', function() {
if($('#log-login-show').is(':checked')) {
$('.register-info-box').fadeOut();
$('.login-info-box').fadeIn();

$('.white-panel').addClass('right-log');
$('.register-show').addClass('show-log-panel');
$('.login-show').removeClass('show-log-panel');

}
else if($('#log-reg-show').is(':checked')) {
$('.register-info-box').fadeIn();
$('.login-info-box').fadeOut();

$('.white-panel').removeClass('right-log');

$('.login-show').addClass('show-log-panel');
$('.register-show').removeClass('show-log-panel');
}
});




// this.signUpButton = document.getElementById('signUp');
// this.signInButton = document.getElementById('signIn');
// this.container = document.getElementById('container');

// this.signUpButton.addEventListener('click', () => {
// this.container.classList.add("right-panel-active");

// });

// this.signInButton.addEventListener('click', () => {
// this.container.classList.remove("right-panel-active");

// });

this.date = new Date();
this.registerDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
this._router.events.pipe(
filter((event: RouterEvent) => event instanceof NavigationEnd)
).subscribe(() => {
this.refreshPage();
});
this.reg();
}


enggFunction(){
this.enggLog=true;
this.login=false;
this.register=false;

}

loginFunction(){
this.enggLog=false;
this.login=true;
this.register=false;

}

registerFunction(){
this.enggLog=false;
this.login=false;
this.register=true;

}
refreshPage() {
console.log("this is for refresh page")
window.location.reload();
}

loginCustomer() {
console.log("this is for customer email", this.customer.emailId)
const string = this.customer.emailId;
const substring = "@";
console.log(string.includes(substring));
if (string.includes(substring)) {


this._service.loginCustomerFromRemote(this.customer).subscribe(
data => {
if (data) {
this.loggedIn.next(true);
console.log(data)
this.sourceData = data;
localStorage.setItem("acesscontroldata", JSON.stringify(data));
this._router.navigate(['dashboard']);
this.msg = 'successfully logged in';
this.toaster.success(this.msg);
console.log("sdfhsdj", data);
window.location.reload();
}

},
error => {
console.log("this is error credentials", error)
this.msg = "Check the Credentails or varify the account"
this.toaster.error(this.msg);


}
)
}

else {

console.log("this is user name ", this.customer.emailId);
this.user.userName = this.customer.emailId;
this.user.password = this.customer.password;
console.log("this is user object", this.user);
if(this.user.userName=="NcsAdmin" && this.user.password=="Password"){
console.log("this.user",this.user);
this.usersourceData = this.user;

localStorage.setItem("acesscontroldata", JSON.stringify(this.usersourceData));

this._router.navigate(['/engineer-dashboard']);

}


else{


this._service.loginUserFromRemote(this.user).subscribe(
data => {
if (data) {
this.loggedIn.next(true);
let userType="Voice Operator";

console.log("this is for dashboard entering data",data.user_type)
if(data.user_type==userType){

console.log("this is for only voice operator dashboard")
this.usersourceData = data;
localStorage.setItem("acesscontroldata", JSON.stringify(data));

this._router.navigate(['/voice-operator-dashboard']);

this.msg = 'successfully logged in';
this.toaster.success(this.msg);
console.log("sdfhsdj", data);
}
else{
this.usersourceData = data;

localStorage.setItem("acesscontroldata", JSON.stringify(data));

this._router.navigate(['/dashboard']);

this.msg = 'successfully logged in';
this.toaster.success(this.msg);
console.log("sdfhsdj", data);

}
}
},
error => {
console.log("this is error credentials", error)
this.msg = "Check the Credentails or varify the account"
this.toaster.error(this.msg);


}
)
}


}
}


engineer_Logged(){
console.log("this is for engineer logged in object",this.engineer);
this._service.loginEngineer(this.engineer).subscribe(
data => {

if (data.engineerName) {
console.log("this is for data engineer",data);
window.location.reload();

this._router.navigate(['/allCustomers',data.engID]);

// this.loggedIn.next(true);
// console.log(data)
// this.sourceData = data;
localStorage.setItem("acesscontroldata", JSON.stringify(data));
// this._router.navigate(['dashboard']);
this.msg = 'successfully logged in';
this.toaster.success(this.msg);
// console.log("sdfhsdj", data);
// window.location.reload();
}

},
error => {
console.log("this is error credentials", error)
this.msg = "Check the Credentails or varify the account"
this.toaster.error(this.msg);


}
)

}


reg(){
this.loggInButton = document.getElementById('signUp');

this.loggInButton.addEventListener('click', () => {
this.container.classList.add("left-panel-active");

});
}


registerCustomer(Registerform) {
//customerProfileID
let customerProfileId = (<HTMLInputElement>document.getElementById("customerProfileId")).value;
console.log("this is for id",customerProfileId);

this.customer.createdDate = this.registerDate;

console.log("this is object customer",this.customer);
this._service.registerCustomerFromRemote(customerProfileId,this.customer)
.subscribe((res) => {
this.toaster.success(res);
this._router.navigate(['/login'])
this.reg();
}, error => {

this.msg = "Something went wrong"
this.toaster.error(this.msg);

}

);
}



storeCustomerData(customer) {
localStorage.setItem('customer', JSON.stringify(customer));
this.customer = customer;
console.log(customer)
}
storeUserData(user) {
localStorage.setItem('user', JSON.stringify(user));
this.user = user;
console.log(user)
}

CancelEngg()
{
    $(".register-info-box").show();
$("div.enggLogin").hide();
$("div.login-show.show-log-panel").show();
}
RegisterMe()
{
$(".register-show").show();
$("div.enggLogin").hide();
$("div.login-show.show-log-panel").hide();
}

LoginMe()
{
$(".register-show").hide();
$("div.enggLogin").hide();
$(".login-show").show();
$(".register-info-box").show();
}

forgotPassword() {
console.log("this is for forgot password")
this.forgotReference = (<HTMLInputElement>document.getElementById("userEmailReference")).value
const refereEmail = this.forgotReference;
const substring = "@";
console.log(refereEmail.includes(substring));
if (refereEmail.includes(substring)) {
console.log("this is the customer forgot password",refereEmail)
this._service.forgotCustomerPassword(refereEmail).subscribe(
(res) => {
console.log("this is the object response",res);
this.msg="please check you mail password reset link"
this.toaster.success(this.msg);
this._router.navigate([''])

// this._router.navigate(['forgot-password']);
localStorage.setItem("forgotData", JSON.stringify(res));


},
error => {
console.log("error exception");
this.msg = error.error;


}
)
}
else{
console.log("user email refrence", this.forgotReference);
this._service.forgot(this.forgotReference).subscribe(
(res) => {
console.log("this is the object response",res);
this._router.navigate(['forgot-password'])
localStorage.setItem("forgotData", JSON.stringify(res));
let data = JSON.parse(localStorage.getItem("forgotData"));
console.log("sudbhsahdqwd",data)
// if(data.user_type=="Voice Operator"){
// this._router.navigate(['/voice-operator-dashboard']);

// }else{
// this._router.navigate([''])

// }

},
error => {
console.log("error exception");
this.msg = error.error;


}
)
}
}



}
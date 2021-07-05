import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../modal/customer';
import { Createuser } from '../modal/createuser';
// import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { CustomerProfile } from '../modal/customer-profile';
import { EngineerSite } from '../modal/engineersite';
import { EngineerTotalDoors } from '../modal/engineertotaldoor';
import { PowerOnReset } from '../modal/poweronreset';
import { LossOfCan } from '../modal/lossofcan';
import { LockDown } from '../modal/lockdown';
import { FireInput } from '../modal/fireinput';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  
 
  private apiServer = environment.apiServer;

  customer: any;

  createuser: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  httpClient: any;

  constructor(private _http: HttpClient) { }

  // public loginCustomerFromRemote(customer :Customer):Observable<any>{

  //  return this._http.post<any>("http://localhost:8082/login",customer)

  //  console.log(customer)
  // }

  public loginCustomerFromRemote(customer: Customer): Observable<any> {

    return this._http.post<any>(this.apiServer + '/login', customer)

    console.log(customer)
  }
  public loginEngineer(engineer): Observable<any> {

    return this._http.post<any>(this.apiServer + '/engineerdashbaordlogin', engineer)

  }


  shareSite(custID, siteid): Observable<string> {
    console.log("shdfjasdkfh", custID)

    return this._http.get<string>(this.apiServer + '/customersite/sendmqtt?custid=' + custID + '&siteid=' + siteid, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  customeRegistration(engId,customerProfile): Observable<CustomerProfile> {
    console.log("shdfjasdkfh", customerProfile)

    return this._http.post<CustomerProfile>(this.apiServer + '/customerprofile/create?engid='+engId, customerProfile, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateCustomerData(custId, customerProfile): Observable<CustomerProfile> {
    console.log("this is for customer profile",custId);
    console.log("this is for customer object",customerProfile)
    debugger;
    return this._http.put<CustomerProfile>(this.apiServer + '/customerprofile/update?custid='+custId, JSON.stringify(customerProfile), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getCustomer(custId): Observable<CustomerProfile[]> {
    console.log("cmg")
    return this._http.get<CustomerProfile[]>(this.apiServer + '/customerprofile/singleall?custID='+ custId)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  deleteCustomer(custId): Observable<string> {
    return this._http.delete<string>(this.apiServer + '/customerprofile/delete?custid='+custId,{responseType: 'text' as 'json' });
    }
  AddSite(custid, site): Observable<EngineerSite> {
    console.log("shdfjasdkfh", site)

    return this._http.post<EngineerSite>(this.apiServer + '/customersite/create?custid=' + custid, site, {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  AddPowerOnreset(siteid, powerOnReset): Observable<PowerOnReset> {
    console.log("shdfjasdkfh", siteid)

    return this._http.post<PowerOnReset>(this.apiServer + '/poweronreset/createdoors?siteid=' + siteid, powerOnReset, {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  AddLossofcan(siteid, LossOfCan): Observable<LossOfCan> {
    console.log("shdfjasdkfh", siteid)

    return this._http.post<LossOfCan>(this.apiServer + '/LossOfCanBus/createdoors?siteid=' + siteid, LossOfCan, {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }


  AddLockDown(siteid, lockdown): Observable<LockDown> {
    console.log("shdfjasdkfh", siteid)

    return this._http.post<LockDown>(this.apiServer + '/lockdown/createdoors?siteid=' + siteid, lockdown, {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  AddFireinput(siteid, fireinput): Observable<FireInput> {
    console.log("shdfjasdkfh", siteid)

    return this._http.post<FireInput>(this.apiServer + '/fireinput/createdoors?siteid=' + siteid, fireinput, {responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFireinput(siteid) : Observable<FireInput[]> {
    console.log("shdfjasdkfh", siteid)

    return this._http.get<FireInput[]>(this.apiServer + '/fireinput/getdoors?siteid=' + siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAlllockdown(siteid) : Observable<LockDown[]> {
    console.log("shdfjasdkfh", siteid)

    return this._http.get<LockDown[]>(this.apiServer + '/lockdown/getdoors?siteid=' + siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
 
  getAlllossofcan(siteid) : Observable<LossOfCan[]> {
    console.log("shdfjasdkfh", siteid)

    return this._http.get<LossOfCan[]>(this.apiServer + '/LossOfCanBus/getdoors?siteid=' + siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAlllpowerOnreset(siteid) : Observable<PowerOnReset[]> {
    console.log("shdfjasdkfh", siteid)

    return this._http.get<PowerOnReset[]>(this.apiServer + '/poweronreset/getdoors?siteid=' + siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
 
  getAllSites(custID): Observable<EngineerSite[]> {
    console.log("shdfjasdkfh", custID)

    return this._http.get<EngineerSite[]>(this.apiServer + '/customersite/getall?custid=' + custID, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getallDoors(custID: any, siteid: any): Observable<EngineerTotalDoors[]> {
    console.log("shdfjasdkfh", custID)

    return this._http.get<EngineerTotalDoors[]>(this.apiServer + '/totaldoor/getall?custid=' + custID+'&siteid='+siteid, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCustomersForAdmin() :Observable<CustomerProfile[]> {
    return this._http.get<CustomerProfile[]>(this.apiServer + '/customerprofile/allforadmin', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCustomers(engID) :Observable<CustomerProfile[]> {
    // console.log("shdfjasdkfh", custID)
 
     return this._http.get<CustomerProfile[]>(this.apiServer + '/customerprofile/all?engid='+engID, this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       )
   }


  getCustomers(custID):Observable<CustomerProfile> {
    // console.log("shdfjasdkfh", custID)
 
     return this._http.get<CustomerProfile>(this.apiServer + '/customerprofile/singleall?custID='+custID, this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       )
   }
  
  AddDoor(custID, siteid, doorentity): Observable<EngineerTotalDoors> {
    console.log("shdfjasdkfh", custID)

    return this._http.post<EngineerTotalDoors>(this.apiServer + '/totaldoor/create?custid=' + custID + '&siteid=' + siteid, doorentity, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public loginUserFromRemote(user: Createuser): Observable<Createuser> {

    return this._http.post<Createuser>(this.apiServer + '/userlogin', user)

    console.log(user)
  }


  public registerCustomerFromRemote(customerId,customer): Observable<string> {
    console.log(customer);
    return this._http.post<string>(this.apiServer + '/register?custprofileid='+customerId, customer, { responseType: 'text' as 'json' })
    console.log(customer);
  }

  storecustomerData(customer) {
    console.log(customer)
    localStorage.setItem('customer', JSON.stringify(customer));
    this.customer = customer;
    console.log(this.customer)
  }

  storeuserData(user) {
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user));
    this.createuser = user;
    console.log(this.createuser)
  }



  loggedIn() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

    return data;
  }
  // loggedVoiceOperator(){
  //   let data = JSON.parse(localStorage.getItem("acesscontroldata"));

  // return data;
  // }

  forgotcodeIn() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

    return data;
  }

  engineerKLoggedIn() {
    let engineerData = JSON.parse(localStorage.getItem("engineerData"));
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  // '/personclass/getall?custid='+ id
  forgot(forgotReference): Observable<any> {
    console.log("this is the refrence", forgotReference)
    return this._http.post<any>(this.apiServer + '/userloginwithforgetpassword?username=' + forgotReference, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  forgotCustomerPassword(refereEmail): Observable<any> {
    console.log("this is the refrence", refereEmail)
    return this._http.post<any>(this.apiServer + '/customerloginwithforgetpassword?emailId=' + refereEmail, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  changePasswordSubmit(customer): Observable<any> {
    console.log("this is the refrence", customer)
    return this._http.post<any>(this.apiServer + '/reset-password', customer, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.errorHandler)
      )
  }


  codeSubmit(codeReference, usernameRefer): Observable<any> {
    console.log("this is the refrence", codeReference)
    return this._http.post<any>(this.apiServer + '/userloginwithsubmitcode?code=' + codeReference + '&username=' + usernameRefer, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }




  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<any, any> {
    debugger;
    throw new Error('Method not implemented.');
  }




}
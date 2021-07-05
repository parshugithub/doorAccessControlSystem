
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoorGroup } from '../modal/door-group';
import { environment } from 'src/environments/environment.prod';
@Injectable({
providedIn: 'root'
})
export class DoorManagementDoorGroupService {
private apiServer = environment.apiServer;
httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json'
})
}
constructor(private httpClient:HttpClient) { }

doorGroupPost(id,siteid,doorGroup:DoorGroup): Observable<DoorGroup> {
console.log("this is object",doorGroup);
//debugger;
return this.httpClient.post<DoorGroup>(this.apiServer + '/doormanagementdoorgroup/create?custid='+id+'&siteid='+siteid,doorGroup,this.httpOptions)
.pipe(
catchError(this.errorHandler)
)
}

updateDoorgroupData(doorgroupid, doorGroup): Observable<DoorGroup> {
return this.httpClient.put<DoorGroup>(this.apiServer + '/doormanagementdoorgroup/update?doorgroupid='+doorgroupid, JSON.stringify(doorGroup), this.httpOptions)
.pipe(
catchError(this.errorHandler)
)
}

getAllCustomerDoorGroup(custid):Observable<DoorGroup[]> {
return this.httpClient.get<DoorGroup[]>(this.apiServer+'/doormanagementdoorgroup/getallforcustomer?custid='+custid)
.pipe(
catchError(this.errorHandler)
)
}

getAll(siteid,custid): Observable<DoorGroup[]> {
console.log("cmg")
return this.httpClient.get<DoorGroup[]>(this.apiServer + '/doormanagementdoorgroup/getall?siteid='+siteid+'&custid='+custid)
.pipe(
catchError(this.errorHandler)
)
}

getOnlySingleDoorGroup(doorgroupid) :Observable<DoorGroup[]> {
console.log("sjhfsdk")
console.log("cmg")
return this.httpClient.get<DoorGroup[]>(this.apiServer + '/doormanagementdoorgroup/getdoorGroup?doorgroupid='+ doorgroupid)
.pipe(
catchError(this.errorHandler)
)
}

deleteDoorGroup(doorgroupid): Observable<any> {

return this.httpClient.delete<any>(this.apiServer + '/doormanagementdoorgroup/delete?doorgroupid='+doorgroupid,{responseType: 'text' as 'json' });
}


getDoorGroupForEmbeedded(doorgroupid,siteid) :Observable<DoorGroup[]> {
console.log("sjhfsdk",doorgroupid)
console.log("cmg",siteid)
return this.httpClient.get<DoorGroup[]>(this.apiServer + '/doorgroup/getdoorgroupforembedded?doorgroupid='+ doorgroupid+'&siteid='+siteid)
.pipe(
catchError(this.errorHandler)
)
}



errorHandler(errorHandler: any): import("rxjs").OperatorFunction<string, any> {
throw new Error('Method not implemented.');
}
}
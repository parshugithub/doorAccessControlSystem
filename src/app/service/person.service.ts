import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../modal/person';
import { PersonClass } from '../modal/person-class';
import { PersonGroup } from '../modal/person-group';
import { PersonTags } from '../modal/person-tags';
import { Property } from '../modal/property';
import { ScheduleMain } from '../modal/schedule-main';
import { environment } from 'src/environments/environment.prod';
import { StaffGroup } from '../modal/staff-group';

@Injectable({
  providedIn: 'root'
})
export class PersonService 

{
  
  person:any;

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAll(siteid,cutstid): Observable<Person[]> {
    console.log("customer id is",cutstid)
    console.log("site id is",siteid)
    return this.httpClient.get<Person[]>(this.apiServer + '/person/getallpersonsofsite?custId='+ cutstid+'&siteid='+siteid)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getPersonClass(id:any) :Observable<PersonClass[]> {
    console.log("sjhfsdk")
    console.log("cmg")
    return this.httpClient.get<PersonClass[]>(this.apiServer + '/personclass/getall?custid='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

   getOnlySinglePersonClass(personclassid) :Observable<PersonClass[]> {
     debugger;
    console.log("sjhfsdk")
    console.log("cmg")
    return this.httpClient.get<PersonClass[]>(this.apiServer + '/personclass/details?personclassid='+ personclassid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getOnlySinglePersonGroup(persongroupid) :Observable<PersonGroup[]> {
    console.log("sjhfsdk")
    console.log("cmg")
    return this.httpClient.get<PersonGroup[]>(this.apiServer + '/persongroup/details?persongroupid='+ persongroupid)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getPerson(personid): Observable<Person[]> {
    console.log(personid)
    console.log("cmg")
    return this.httpClient.get<Person[]>(this.apiServer + '/person/person/details?personid='+ personid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createPersonClass( id: any,siteid,personclassobj: PersonClass) : Observable<PersonClass> {
    console.log('this.id',id)
    
        return this.httpClient.post<PersonClass>(this.apiServer + '/personclass/create?custId='+id+'&siteid='+siteid,personclassobj, {responseType: 'text' as 'json' })
        .pipe(
          catchError(this.errorHandler)
        )
      } 


  



      createPersonGroup(persongroupobj: PersonGroup, id: any,siteid) : Observable<PersonGroup> {
        console.log('this.id',id)
        
            return this.httpClient.post<PersonGroup>(this.apiServer + '/persongroup/create?custId='+id+'&siteid='+siteid,persongroupobj, {responseType: 'text' as 'json' })
            .pipe(
              catchError(this.errorHandler)
            )
          } 
    

      
    
      updatePersonClass(updatePersonclassId,personclassFinalUpdate) : Observable<PersonClass> {
        
            return this.httpClient.put<PersonClass>(this.apiServer + '/personclass/update?personclassid='+updatePersonclassId,JSON.stringify(personclassFinalUpdate),this.httpOptions)
            .pipe(
              catchError(this.errorHandler)
            )
          } 



          updatePersonGroup(updatePersongroupId,persongroupFinalUpdate) : Observable<PersonGroup> {
            return this.httpClient.put<PersonGroup>(this.apiServer + '/persongroup/update?persongroupid='+updatePersongroupId,JSON.stringify(persongroupFinalUpdate),this.httpOptions)
            .pipe(
              catchError(this.errorHandler)
            )
          } 



      deletePersonClass(personclassid): Observable<any> {
        return this.httpClient.delete<any>(this.apiServer + '/personclass/delete?personclassid='+personclassid,{responseType: 'text' as 'json' });
        }
    


  getSchedueles(id,siteid): Observable<ScheduleMain[]> {
   console.log("wehjbwehfdwe",id,siteid)
    return this.httpClient.get<ScheduleMain[]>(this.apiServer + '/schedulemain/all/?custId='+id+'&siteid='+siteid)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  gettingFlatNumber(id,siteid): Observable<Property[]> {
    console.log("cmg")
    return this.httpClient.get<Property[]>(this.apiServer + '/person/getflatnumber?custid='+id+'&siteid='+siteid)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  create(id,siteid,person): Observable<Person> {
    console.log('this.id')
    console.log("this is person",person)
    console.log("is this is site id",siteid)
        return this.httpClient.post<Person>(this.apiServer + '/person/create?custId='+id+'&siteid='+siteid,person, {responseType: 'text' as 'json' })
        .pipe(
          catchError(this.errorHandler)
        )
      }

      updatePersonData(personid, person): Observable<Person> {
        return this.httpClient.put<Person>(this.apiServer + '/person/update?personid='+personid, JSON.stringify(person), this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
      }

      settingPersonTag(personTags): Observable<PersonTags> {
        console.log("this is person tags",personTags)
            return this.httpClient.post<PersonTags>(this.apiServer + '/personTags/create',personTags, {responseType: 'text' as 'json' })
            .pipe(
              catchError(this.errorHandler)
            )
          }
      
      
  deletePerson(personid): Observable<any> {
    return this.httpClient.delete<any>(this.apiServer + '/person/delete?personid='+personid,{responseType: 'text' as 'json' });
    }


  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Person, any> {
    throw new Error('Method not implemented.');
  }

  updatePersonWithAll(personid, personupdate,custId,siteid) : Observable<Person> {
    return this.httpClient.put<Person>(this.apiServer + '/person/personwithall/update?personid='+personid+'&custId='+custId+'&siteid='+siteid, JSON.stringify(personupdate), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getAllPersonGroups(id: any): Observable<PersonGroup[]> {
   
    return this.httpClient.get<PersonGroup[]>(this.apiServer + '/persongroup/getall/?custid='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
   // console.log("the staff group",this.staff)
  }
  


}

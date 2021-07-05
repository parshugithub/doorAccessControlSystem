

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
export class PersonInSiteService 

{
  
  person:any;

  private apiServer = environment.apiServer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAll(cutstid,siteid): Observable<Person[]> {
    console.log("customer id is",cutstid)
    console.log("site id is",siteid)
    return this.httpClient.get<Person[]>(this.apiServer + '/personmanagemet/getallpersonsofsite?custId='+ cutstid+'&siteid='+siteid)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  gettingAllPesonsInSite(id): Observable<Person[]> {
    console.log("djfwqeufewf",id)
    return this.httpClient.get<Person[]>(this.apiServer + '/personmanagemet/getallpersons?custId='+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }


getAllPersons(id): Observable<Person[]> {
  console.log("djfwqeufewf",id)
  return this.httpClient.get<Person[]>(this.apiServer + '/personmanagemet/getallpersons?custId='+ id)
  .pipe(
    catchError(this.errorHandler)
  )

}

getAllPersonGroups(id): Observable<PersonGroup[]> {
  console.log("djfwqeufewf",id)
  return this.httpClient.get<PersonGroup[]>(this.apiServer + '/personmangementgroup/getall?custid='+ id)
  .pipe(
    catchError(this.errorHandler)
  )

}


  getPersonClassForSite(id,siteid) :Observable<PersonClass[]> {
    console.log("sjhfsdk")
    console.log("cmg")
    return this.httpClient.get<PersonClass[]>(this.apiServer + '/personmanagmentpersonclass/getallforsite?custid='+ id+'&siteid='+siteid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getPersonGroupForSite(id,siteid) :Observable<PersonGroup[]> {
    console.log("sjhfsdk")
    console.log("cmg")
    return this.httpClient.get<PersonGroup[]>(this.apiServer + '/personmangementgroup/getallwithSite?custid='+ id+'&siteid='+siteid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

   getOnlySinglePersonClass(personclassid) :Observable<PersonClass[]> {
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
    return this.httpClient.get<Person[]>(this.apiServer + '/personmanagement/create?personid='+ personid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getOnlyPersonInSite(personid): Observable<Person[]> {
    console.log(personid)
    console.log("cmg")
    return this.httpClient.get<Person[]>(this.apiServer + '/personmanagemet/details?personid='+ personid)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  // createPersonClass( id: any,siteid,personclassobj: PersonClass) : Observable<PersonClass> {
  //   console.log('this.id',id)
    
  //       return this.httpClient.post<PersonClass>(this.apiServer + '/personclass/create?custId='+id+'&siteid='+siteid,personclassobj, {responseType: 'text' as 'json' })
  //       .pipe(
  //         catchError(this.errorHandler)
  //       )
  //     } 

      createPersonClassInSite( id: any,siteid,personclassobj: PersonClass) : Observable<PersonClass> {
        console.log('this.id',id)
        console.log("this is for person class object",personclassobj)
            return this.httpClient.post<PersonClass>(this.apiServer + '/personmanagmentpersonclass/create?custId='+id+'&siteid='+siteid,personclassobj, {responseType: 'text' as 'json' })
            .pipe(
              catchError(this.errorHandler)
            )
          } 
    
          getOnlySinglePersonClassInSite(personclassid) :Observable<PersonClass[]> {
            console.log("sjhfsdk")
            console.log("cmg")
            return this.httpClient.get<PersonClass[]>(this.apiServer + '/personmanagmentpersonclass/details?personclassid='+ personclassid)
            .pipe(
              catchError(this.errorHandler)
            )
          }

          updatePersonClassInSite(updatePersonclassId,personclassFinalUpdate) : Observable<PersonClass> {
        
            return this.httpClient.put<PersonClass>(this.apiServer + '/personmanagmentpersonclass/update?personclassid='+updatePersonclassId,JSON.stringify(personclassFinalUpdate),this.httpOptions)
            .pipe(
              catchError(this.errorHandler)
            )
          } 


          getAllPersonClassInSite(id): Observable<PersonClass[]> {
            console.log("sjhfsdk",id)
            console.log("cmg")
            return this.httpClient.get<PersonClass[]>(this.apiServer + '/personmanagmentpersonclass/getall?custid='+ id)
            .pipe(
              catchError(this.errorHandler)
            )
          }

          deletepersonClassInSite(personclassid): Observable<any> {
            return this.httpClient.delete<any>(this.apiServer + '/personmanagmentpersonclass/delete?personclassid='+personclassid,{responseType: 'text' as 'json' });
            }
        
          
            createPersonGroupInSite( id,siteid,persongroupobj) : Observable<PersonGroup> {
              console.log('this.id',id)
              
                  return this.httpClient.post<PersonGroup>(this.apiServer + '/personmangementgroup/create?custId='+id+'&siteid='+siteid,persongroupobj, {responseType: 'text' as 'json' })
                  .pipe(
                    catchError(this.errorHandler)
                  )
                } 
                getAllPersongroupInSite(id): Observable<PersonGroup[]> {
                  console.log("sjhfsdk",id)
                  console.log("cmg")
                  return this.httpClient.get<PersonGroup[]>(this.apiServer + '/personmangementgroup/getall?custid='+ id)
                  .pipe(
                    catchError(this.errorHandler)
                  )
                }
              
                getAllPersongroupInForSite(id,siteid): Observable<PersonGroup[]> {
                  console.log("sjhfsdk",id)
                  console.log("cmg",siteid)
                  return this.httpClient.get<PersonGroup[]>(this.apiServer + '/personmangementgroup/getallwithSite?custid='+id+'&siteid='+siteid)
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
            return this.httpClient.put<PersonGroup>(this.apiServer + '/personmangementgroup/update?persongroupid='+updatePersongroupId,JSON.stringify(persongroupFinalUpdate),this.httpOptions)
            .pipe(
              catchError(this.errorHandler)
            )
          } 

          getOnlySinglePersonGroupInSite(pgroupid) :Observable<PersonGroup[]> {
            debugger;
            console.log("sjhfsdk")
            console.log("cmg")
            return this.httpClient.get<PersonGroup[]>(this.apiServer + '/personmangementgroup/details?persongroupid='+ pgroupid)
            .pipe(
              catchError(this.errorHandler)
            )
          }
        

          deletePersonGroupInSite(pgroupid): Observable<any> {
            return this.httpClient.delete<any>(this.apiServer + '/personmangementgroup/delete?persongroupid='+pgroupid,{responseType: 'text' as 'json' });
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



  // create(id,siteid,person): Observable<Person> {
  //   console.log('this.id')
  //   console.log("this is person",person)
  //   console.log("is this is site id",siteid)
  //       return this.httpClient.post<Person>(this.apiServer + '/person/create?custId='+id+'&siteid='+siteid,person, {responseType: 'text' as 'json' })
  //       .pipe(
  //         catchError(this.errorHandler)
  //       )
  //     }

      createPersonInSite(id,siteid,person): Observable<Person> {  
        console.log('this.id',id)
        console.log("this is person",person)
        console.log("is this is site id",siteid)
            return this.httpClient.post<Person>(this.apiServer + '/personmanagemet/create?custId='+id+'&siteid='+siteid,person, {responseType: 'text' as 'json' })
            .pipe(
              catchError(this.errorHandler)
            )
          }


      updatePersonData(personid, person): Observable<Person> {
        return this.httpClient.put<Person>(this.apiServer + '/personmanagemet/update?personid='+personid, JSON.stringify(person), this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
      }

      settingPersonTagForSite(personTags): Observable<PersonTags> {
        console.log("this is person tags",personTags)
            return this.httpClient.post<PersonTags>(this.apiServer + '/personmanagmenttags/create',personTags, {responseType: 'text' as 'json' })
            .pipe(
              catchError(this.errorHandler)
            )
          }
      
      
  deleteInSitePerson(personid): Observable<any> {
    return this.httpClient.delete<any>(this.apiServer + '/personmanagemet/delete?personid='+personid,{responseType: 'text' as 'json' });
    }


 

  updatePersonInSiteWithAll(personid, custId,siteid,personupdate) : Observable<Person> {
    return this.httpClient.put<Person>(this.apiServer + '/person/personwithall/update?personid='+personid+'&custId='+custId+'&siteid='+siteid, JSON.stringify(personupdate), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Person, any> {
    throw new Error('Method not implemented.');
  }


 


}

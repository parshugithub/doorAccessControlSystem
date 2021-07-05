import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationPipe'
})
export class PaginationPipePipe implements PipeTransform {
  transform(value: any[], currentPage:number,perpage:number): any {
    let result =  value.filter((curr,index)=>{
      return index >= (currentPage-1)*perpage && index < currentPage *perpage
    }); 
    return result;
  }
  transformBackTask(value: any[], currentBacktaskPage:number,perpage:number): any {
    let results =  value.filter((curr,index)=>{
      return index >= (currentBacktaskPage-1)*perpage && index < currentBacktaskPage*perpage
    }); 
    return results;
  }

  transformEmbeed(value: any[], currentEmbeeddedPage:number,perpage:number): any {
    let results =  value.filter((curr,index)=>{
      return index >= (currentEmbeeddedPage-1)*perpage && index < currentEmbeeddedPage*perpage
    }); 
    return results;
  }
  transformSite(value: any[], currentSitePage:number,perpage:number): any {
    let results =  value.filter((curr,index)=>{
      return index >= (currentSitePage-1)*perpage && index < currentSitePage*perpage
    }); 
    return results;
  }

}
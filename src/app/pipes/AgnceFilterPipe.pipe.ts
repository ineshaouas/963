import { Pipe, PipeTransform } from '@angular/core';
import { Agence } from '../model/Agence';
import { Facturation } from '../model/Facturation';

@Pipe({
  name: 'filter',
})
export class AgnceFilterPipe implements PipeTransform {
  transform(value: any[] , filterValue: any, propertyName:any): any[] {  
   //console.log('inside pipe: '+propertyName+' - '+filterValue );   
 
    if (filterValue.length > 0 && filterValue !=='all') {
      const result =[];
      for (const element of value){     
      
        if (element[propertyName] == filterValue ) {
       
          result.push(element);
        }
      }
      return result;      
    }
  
    return value;
  }
}
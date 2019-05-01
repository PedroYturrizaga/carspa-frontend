import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToFech'
})
export class StringToFechPipe implements PipeTransform {

  transform(dateString: any, args?: any): any {
    let year = (dateString.substr(0, 3));
    let month = (dateString.substr(4, 5));
    let day = (dateString.substr(5));
    let _day = year + "-" + month + "-"+day;
    return _day;
  }

  // transform(value:string, limite:string) : string{
  //   let limit = parseInt(limite);
  //   return value.length > limit ? value.substring(0,limit)+"..." :   value;
  // }

}

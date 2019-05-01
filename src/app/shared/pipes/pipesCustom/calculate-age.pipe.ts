import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateAge'
})
export class CalculateAgePipe implements PipeTransform {

  transform(dateString: any, args?: any): any {
    let year = Number(dateString.substr(0, 4));
    let month = Number(dateString.substr(4, 2)) - 1;
    let day = Number(dateString.substr(6, 2));
    let today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }
    return age;
  }

}

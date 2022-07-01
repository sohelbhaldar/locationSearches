import { Pipe, PipeTransform } from '@angular/core';
import { part } from '../Interfaces/part';

@Pipe({
  name: 'filterPartname'
})
export class FilterPartnamePipe implements PipeTransform {

  part: part[];
  transform(part: part[], partName: string) {

    if (part.length === 0 || partName === '' || typeof (partName) === 'undefined' || partName === "") {
      return part;
    }
    else {
      var part = part.filter((parts) => parts.Name.includes(partName) || parts.PartNo.includes(partName));
      console.log(part);
      return part;
    }
  }

}

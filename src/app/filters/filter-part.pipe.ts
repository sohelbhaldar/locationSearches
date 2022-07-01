import { Pipe, PipeTransform } from '@angular/core';
import { part } from '../Interfaces/part'

@Pipe({
  name: 'filterPart'
})
export class FilterPartPipe implements PipeTransform {

  transform(part: part[], partId: number) {

    if (part.length === 0 || partId < 1 || typeof (partId) === "undefined" || Number.isNaN(partId)) {
      return part;
    }
    else {
      var part = part.filter((parts) => { return parts.PartId == partId })
      console.log(part);
      return part;
    }
  }
  // transform(part: part[], partName: string) {

  //   if (part.length === 0 || partName === '') {
  //     return part;
  //   }
  //   else {
  //     part.filter((parts) => parts.Name == partName)
  //   }
  //   return part;
  // }
}

import { Pipe, PipeTransform } from '@angular/core';
import { locationSearchesDomain } from '../Modals/locationSearches';
import { Location } from "../Modals/location"
import { part } from '../Interfaces/part'

@Pipe({
  name: 'filterPart'
})
export class FilterPartPipe implements PipeTransform {

  transform(part: part[], partId: number) {

    if (part.length === 0 || partId === 0 || typeof (partId) === "undefined") {
      return part;
    }
    else {
      return part.filter((parts) => { return parts.PartId == partId })
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

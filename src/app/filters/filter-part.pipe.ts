import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPart'
})
export class FilterPartPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

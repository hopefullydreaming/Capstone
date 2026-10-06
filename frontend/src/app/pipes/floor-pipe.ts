import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor',
})
export class FloorPipe implements PipeTransform {
  transform(value: number): number {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return 0;
    }
    return Math.floor(Number(value));
  }
}

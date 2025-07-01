import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population',
  standalone: true,
})
export class PopulationPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): string {
    if (value == null) return '';

    return value.toLocaleString('en-US');
  }
}

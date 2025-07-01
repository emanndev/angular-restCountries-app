import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectList',
  standalone: true,
})
export class ObjectListPipe implements PipeTransform {
  transform(
    value: { [key: string]: any } | undefined,
    type: 'currencies' | 'languages' = 'languages'
  ): string {
    if (!value) return '';

    if (type === 'currencies') {
      return Object.values(value)
        .map((currency: any) => `${currency.name}`)
        .join(', ');
    }

    return Object.values(value).join(', ');
  }
}

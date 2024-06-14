import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(palabra: string): string {
    return palabra
      .split(' ')
      .map(
        (cadena) =>
          cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase()
      )
      .join(' ');
  }
}

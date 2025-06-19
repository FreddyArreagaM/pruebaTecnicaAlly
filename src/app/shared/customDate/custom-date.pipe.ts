import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    let fecha: Date;
    if (typeof value === 'string') {
      fecha = new Date(value.replace(' ', 'T'));
    } else {
      fecha = new Date(value);
    }
    const yyyy = fecha.getFullYear();
    const m = fecha.getMonth() + 1;
    const d = fecha.getDate();
    let h = fecha.getHours();
    const min = String(fecha.getMinutes()).padStart(2, '0');
    const s = String(fecha.getSeconds()).padStart(2, '0');
    const ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    return `${yyyy}-${m}-${d} ${h}:${min}:${s} ${ampm}`;
  }
}
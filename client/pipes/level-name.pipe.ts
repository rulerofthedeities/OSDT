import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'levelName'})
export class LevelNamePipe implements PipeTransform {
  transform(value: number): string {
    let level = '';
    switch(value) {
      case 0 : level = 'Read'; break;
      case 1 : level = 'Write'; break;
      default: level = 'Unknown';
    }
    return level;
  }
}

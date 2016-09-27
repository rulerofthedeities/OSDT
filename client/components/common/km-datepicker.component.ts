import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'km-datepicker',
  template: `
    <div class="input-group" (click)="togglePopup()">
      <span class="input-group-addon">
        <span class="glyphicon glyphicon-calendar"></span>
      </span>
      <div class="form-control">{{dateModel | date:'longDate'}}</div>
    </div>

    
    <datepicker 
      *ngIf="showDatepicker"
      class="popup"
      [(ngModel)]="dateModel" 
      showWeeks="true" 
      (ngModelChange)="hidePopup($event)" >
    </datepicker>
`,
  styles: [`
  .popup {
    position: absolute;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #ddd;
    height: 251px;
    z-index:2;
  }
`]
})

export class KmDatepicker {
  @Input() dateModel: Date;
  @Output() dateModelChange = new EventEmitter<string>();
  private showDatepicker: boolean = false;

  togglePopup() {
    this.showDatepicker = !this.showDatepicker;
  }

  hidePopup(event) {
    this.showDatepicker = false;
    this.dateModel = event;
    this.dateModelChange.emit(event);
  }
}

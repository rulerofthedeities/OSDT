import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'modal-confirm',
  template: `
    <div class="modal" tabindex="-1" role="dialog" 
      [ngStyle]="{'display': showModal ? 'block' : 'none'}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <button type="button" 
              class="close" aria-label="Close" 
              (click)="onModalNo()">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">
              <ng-content select="[title]"></ng-content>
            </h4>
          </div>
          <div class="modal-body">
            <p>
              <ng-content select="[message]"></ng-content>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" 
              class="btn" 
              [ngClass]="['btn-' + level]"
              (click)="onModalYes()">Yes
            </button>
            <button type="button" 
              class="btn btn-success" 
              (click)="onModalNo()">No
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})

export class ModalConfirm {
  @Input() level = 'danger';
  @Output() confirmed = new EventEmitter<boolean>();
  showModal = false;

  onModalYes() {
    this.showModal = false;
    this.confirmed.emit(true);
  }

  onModalNo() {
    this.showModal = false;
    this.confirmed.emit(false);
  }
}

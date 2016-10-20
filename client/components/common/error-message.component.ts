import {Component, OnInit} from '@angular/core';
import {Error} from '../../models/error.model';
import {ErrorService} from '../../services/error.service';

@Component({
    selector: 'error-msg',
    template: `
      <div *ngIf="showError" class="text-danger">
        <h4 class="modal-title">{{errorData?.title}}</h4>
        <p>Error: {{errorData?.message}}</p>
      </div>
    `
})

export class ErrorMessage implements OnInit {
  showError = false;
  errorData: Error;

  constructor (private errorService: ErrorService) {}

  onErrorHandled() {
    this.showError = false;
  }

  ngOnInit() {
    this.errorService.errorOccurred.subscribe(
      errorData => {
        this.errorData = errorData;
        this.showError = true;
      }
    );
  }
}

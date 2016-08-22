import {Component, OnInit} from '@angular/core';
import {Error} from '../../models/error.model';
import {ErrorService} from '../../services/error.service';

@Component({
    selector: 'error-msg',
    template: `
      <div *ngIf="showError">
        <h4 class="modal-title">{{errorData?.title}}</h4>
        <p>{{errorData?.message}}</p>
      </div>
    `
})

export class ErrorMessage implements OnInit {
  errorDisplay = 'none';
  errorData: Error;

  constructor (private errorService: ErrorService) {}

  onErrorHandled() {
    this.errorDisplay = 'none';
  }

  ngOnInit() {
    this.errorService.errorOccurred.subscribe(
      errorData => {
          this.errorData = errorData;
          this.errorDisplay = 'block';
      }
    );
  }
}

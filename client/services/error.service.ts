import {EventEmitter} from '@angular/core';
import {Error} from '../models/error.model';

export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any) {
    console.log('error', error);
    var msg = 'unknown error message';
    var err = 'unknown error';
    var title = 'error';
    if (error._body) {
      error = JSON.parse(error._body);
    }
    if (error.error) {
      error = error.error;
    }
    if (error) {
      msg = error.message;
      err = error.error;
      title = error.title || 'Error';
    }
    this.errorOccurred.emit(new Error(title, msg, err));
  }
}

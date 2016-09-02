import {EventEmitter} from '@angular/core';
import {Error} from '../models/error.model';

export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any) {
    console.log('error', error);
    var msg = 'unknown error message';
    var err = 'unknown error';
    if (error.error) {
      msg = error.error.message;
      err = error.error;
      this.errorOccurred.emit(new Error(error.title, msg, err));
    }
  }
}

import {Routes} from '@angular/router';
import {Currency} from './components/currency.component';
import {Recipient} from './components/recipient.component';

export const routes: Routes = [
  {path: 'recipients', component: Recipient},
  {path: 'currencies', component: Currency}
];


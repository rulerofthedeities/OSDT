import {Routes, RouterModule} from '@angular/router';
import {Currency} from './components/currency.component';
import {Recipient} from './components/recipient.component';

const routes: Routes = [
  {path: '', component: Recipient},
  {path: 'currencies', component: Currency}
];

export const routing = RouterModule.forRoot(routes);

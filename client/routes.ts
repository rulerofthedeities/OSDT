import {Routes, RouterModule} from '@angular/router';
import {Currency} from './components/currency.component';

const routes: Routes = [
  {path: '', component: Currency}
];

export const routing = RouterModule.forRoot(routes);

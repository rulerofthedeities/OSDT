import {Routes, RouterModule} from '@angular/router';
import {Demo} from './components/demo.component';

const routes: Routes = [
  {path: '', component: Demo}
];

export const routing = RouterModule.forRoot(routes);

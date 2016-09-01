import {Routes} from '@angular/router';
import {Currency} from './components/currency.component';
import {Recipient} from './components/recipient.component';
import {SignUp} from './components/auth/sign-up.component';
import {SignIn} from './components/auth/sign-in.component';
import {LogOut} from './components/auth/log-out.component';
import {AuthMenu} from './components/auth/auth-menu.component';

export const routes: Routes = [
  {path: '', component: Recipient},
  {path: 'recipients', component: Recipient},
  {path: 'currencies', component: Currency},
  {
    path: 'auth',
    component: AuthMenu,
    children: [
      {
        path: '',
        redirectTo: '/auth/signup',
        pathMatch: 'full',
        component: AuthMenu
      },
      {path: 'signup', component: SignUp},
      {path: 'signin', component: SignIn},
      {path: 'logout', component: LogOut}
    ]
  },
];


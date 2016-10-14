import {Routes} from '@angular/router';
import {Currencies} from './components/currencies.component';
import {Recipients} from './components/recipients.component';
import {Donations} from './components/donations.component';
import {Dashboard} from './components/dashboard.component';
import {SignUp} from './components/auth/sign-up.component';
import {SignIn} from './components/auth/sign-in.component';
import {AuthMenu} from './components/auth/auth-menu.component';
import {AccessResolver} from './resolves/access.resolver';
import {CurrenciesResolver} from './resolves/currencies.resolver';
import {AuthGuard} from './services/auth-guard.service';

export const routes: Routes = [
  {path: '', component: Dashboard, canActivate: [AuthGuard]},
  {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
  {
    path: 'recipients',
    component: Recipients,
    resolve: {access:AccessResolver},
    canActivate: [AuthGuard]
  },
  {
    path: 'recipients/donations/:id',
    component: Recipients,
    resolve: {access:AccessResolver},
    canActivate: [AuthGuard]
  },
  {
    path: 'donations',
    component: Donations,
    resolve: {currencies:CurrenciesResolver, access:AccessResolver},
    canActivate: [AuthGuard]
  },
  {
    path: 'donations/:id',
    component: Donations,
    resolve: {currencies:CurrenciesResolver},
    canActivate: [AuthGuard]
  },
  {
    path: 'currencies',
    component: Currencies,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthMenu,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full',
        component: AuthMenu
      },
      {path: 'signup', component: SignUp},
      {path: 'signin', component: SignIn}
    ]
  }
];

import {Routes} from '@angular/router';
import {Currencies} from './components/currencies.component';
import {Recipients} from './components/recipients.component';
import {Donations} from './components/donations.component';
import {EditDonation} from './components/edit-donation.component';
import {SignUp} from './components/auth/sign-up.component';
import {SignIn} from './components/auth/sign-in.component';
import {LogOut} from './components/auth/log-out.component';
import {AuthMenu} from './components/auth/auth-menu.component';

export const routes: Routes = [
  {path: '', component: Recipients},
  {path: 'recipients', component: Recipients},
  {path: 'currencies', component: Currencies},
  {path: 'donations', component: Donations},
  {path: 'donation', component: EditDonation},
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


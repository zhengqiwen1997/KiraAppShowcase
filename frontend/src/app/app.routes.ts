import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth.component';
import { SuccessComponent } from './components/success.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'success', component: SuccessComponent },
  { path: '**', redirectTo: '' }
]; 
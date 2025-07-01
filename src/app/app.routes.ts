import { Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

export const routes: Routes = [
  // Redirect to the country list by default
  { path: '', redirectTo: '/countries', pathMatch: 'full' },

  // Country routes
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/:code', component: CountryDetailsComponent },
];

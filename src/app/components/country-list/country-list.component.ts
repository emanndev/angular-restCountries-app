import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Country } from '../../models/country.interface';
import { Router, RouterLink } from '@angular/router';
import {
  loadCountries,
  setSearchQuery,
  setFilterRegion,
  selectCountry,
} from '../../store/country.actions';
import {
  selectFilteredCountries,
  selectError,
  selectLoading,
} from '../../store/country.selectors';


@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  countries$: Observable<Country[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  searchQuery: string = '';
  filterRegion: string = '';
  regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  constructor(private store: Store, private router: Router) {
    this.countries$ = this.store.select(selectFilteredCountries);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
      this.store.dispatch(loadCountries());
  }

  onSearch(){
    this.store.dispatch(setSearchQuery({ query: this.searchQuery }));
  }

  onFilterRegion(region: string) {
    this.filterRegion = region;
    this.store.dispatch(setFilterRegion({ region }));
  }

  selectCountry(country: Country) {
    this.store.dispatch(selectCountry({ code: country.cca3 }));
    this.router.navigate(['/country', country.cca3]);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.interface';
import { loadCountryByCode, selectCountry } from '../../store/country.actions';
import {
  selectSelectedCountry,
  selectLoading,
  selectError,
} from '../../store/country.selectors';
import { PopulationPipe } from '../../pipes/population.pipe';
import { ObjectListPipe } from '../../pipes/object-list.pipe';
import { CountryApiService } from '../../services/country-api.service';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, PopulationPipe, ObjectListPipe],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  country$: Observable<Country | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  borderCountries: { code: string; name: string }[] = [];
  countryApi = inject(CountryApiService);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.country$ = this.store.select(selectSelectedCountry);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('code')),
        distinctUntilChanged()
      )
      .subscribe((code) => {
        if (code) {
          this.store.dispatch(loadCountryByCode({ code }));
        }
      });

    // Get border countries
    this.country$.subscribe((country) => {
      if (country?.borders?.length) {
        this.countryApi
          .getCountriesByCodes(country.borders)
          .subscribe((borderCountries) => {
            this.borderCountries = borderCountries.map((c) => ({
              code: c.cca3,
              name: c.name.common,
            }));
          });
      } else {
        this.borderCountries = [];
      }
    });
  }

  goBack() {
    this.router.navigate(['/countries']);
  }

  selectBorderCountry(code: string) {
    this.router.navigate(['/countries', code]);
  }
}

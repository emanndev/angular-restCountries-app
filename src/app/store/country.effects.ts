import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, of } from 'rxjs';
import { CountryApiService } from '../services/country-api.service';
import * as CountryActions from './country.actions';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);
  private countryApi = inject(CountryApiService);

  //  Load all countries
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countryApi.getAllCountries().pipe(
          delay(1000),
          map((countries) => {
            return CountryActions.loadCountriesSuccess({ countries });
          }),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load country by code
  loadCountryByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountryByCode),
      mergeMap(({ code }) =>
        this.countryApi.getCountryByCode(code).pipe(
          map((country) =>
            CountryActions.loadCountryByCodeSuccess({ country })
          ),
          catchError((error) =>
            of(
              CountryActions.loadCountryByCodeFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}

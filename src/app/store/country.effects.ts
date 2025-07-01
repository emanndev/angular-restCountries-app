import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryApiServiceService } from '../services/country-api-service.service';
import * as CountryActions from './country.actions';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private countryApiService: CountryApiServiceService
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      switchMap(() =>
        this.countryApiService.getAllCountries().pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

    loadCountryByCode$ = createEffect(() =>
        this.actions$.pipe(
        ofType(CountryActions.loadCountryByCode),
        switchMap(({ code }) =>
            this.countryApiService.getCountryByCode(code).pipe(
            map((country) =>
                CountryActions.loadCountryByCodeSuccess({ country })
            ),
            catchError((error) =>
                of(CountryActions.loadCountryByCodeFailure({ error: error.message }))
            )
            )
        )
        )
    );
}

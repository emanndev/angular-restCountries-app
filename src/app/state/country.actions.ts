import { createAction, props } from '@ngrx/store';
import { Country } from '../models/country.interface';

// This action is dispatched to load countries from the API
export const loadCountries = createAction('[ Country ] Load Countries');

// This action is dispatched when the countries are successfully loaded
export const loadCountriesSuccess = createAction(
  '[ Country ] Load Countries Success',
  props<{ countries: Country[] }>()
);

// This action is dispatched when there is an error loading countries
export const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: string }>()
);

// This action is dispatched to load countries by their codes
export const loadCountryByCode = createAction(
  '[Country] Load Country By Code',
  props<{ code: string }>()
);

// This action is dispatched when a country is successfully loaded by its code
export const loadCountryByCodeSuccess = createAction(
  '[Country] Load Country By Code Success',
  props<{ country: Country }>()
);

// This action is dispatched when there is an error loading a country by its code
export const loadCountryByCodeFailure = createAction(
  '[Country] Load Country By Code Failure',
  props<{ error: string }>()
);

// This action is dispatched to select a country
export const selectCountry = createAction(
  '[Country] Select Country',
  props<{ country: Country }>()
);

// This action is dispatched to search for countries based on a query
export const setSearchQuery = createAction(
  '[Country] Set Search Query',
  props<{ query: string }>()
);

// This action is dispatched to filter countries by region
export const setFilterRegion = createAction(
  '[Country] Set Filter Region',
  props<{ region: string }>()
);

// This action is dispatched to set the theme
export const setTheme = createAction(
  '[Country] Set Theme',
  props<{ theme: 'light' | 'dark' }>()
);

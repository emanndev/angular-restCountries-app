import { createReducer, on } from '@ngrx/store';
import { CountryState, initialState } from './country.state';
import * as CountryActions from './country.actions';

export const countryReducer = createReducer(
  initialState,

  on(CountryActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

on(CountryActions.loadCountriesSuccess, (state, { countries }) => {
  console.log('Reducer updating state with:', countries);
  return {
    ...state,
    countries,
    loading: false,
    error: null,
  };
}),

  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CountryActions.loadCountryByCode, (state, { code }) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CountryActions.loadCountryByCodeSuccess, (state, { country }) => ({
    ...state,
    selectedCountry: country,
    loading: false,
    error: null,
  })),

  on(CountryActions.loadCountryByCodeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CountryActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),

  on(CountryActions.setFilterRegion, (state, { region }) => ({
    ...state,
    filterRegion: region,
  })),

  on(CountryActions.setTheme, (state, { theme }) => ({
    ...state,
    theme,
  })),

  on(CountryActions.selectCountry, (state, { code }) => ({
    ...state,
    selectedCountry:
      state.countries.find((country) => country.cca3 === code) || null,
  }))
);

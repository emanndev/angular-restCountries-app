import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.state';

export const selectedCountryState =
  createFeatureSelector<CountryState>('country');

// This selector returns the list of countries from the state
export const selectFilteredCountries = createSelector(
  selectedCountryState,
  (state) => {
    let filtered = state.countries;

    // Search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );
    }

    // Region filter
    if (state.filterRegion) {
      filtered = filtered.filter(
        (country) => country.region === state.filterRegion
      );
    }

    // Sort alphabetically
    filtered = [...filtered].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    return filtered;
  }
);

// This selector returns the loading state of the country data
export const selectSelectedCountry = createSelector(
  selectedCountryState,
  (state) => state.selectedCountry
);

export const selectSearchQuery = createSelector(
  selectedCountryState,
  (state) => state.searchQuery
);

export const selectFilterRegion = createSelector(
  selectedCountryState,
  (state) => state.filterRegion
);

export const selectTheme = createSelector(
  selectedCountryState,
  (state) => state.theme
);

export const selectLoading = createSelector(
  selectedCountryState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectedCountryState,
  (state) => state.error
);

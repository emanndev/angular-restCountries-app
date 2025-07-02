import { Country } from '../models/country.interface';

export interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  searchQuery: string;
  filterRegion: string;
  theme: 'light' | 'dark';
  loading: boolean;
  error: string | null;
}

export const initialState: CountryState = {
  countries: [],
  selectedCountry: null,
  searchQuery: '',
  filterRegion: '',
  theme: 'light',
  loading: false,
  error: null,
};

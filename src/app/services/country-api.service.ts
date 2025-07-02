import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Country } from '../models/country.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getAllCountries(): Observable<Country[]> {
    const fields =
      'name,cca3,capital,region,population,flags,borders,subregion,tld,languages'; 

    return this.http.get<any[]>(`${this.apiUrl}/all?fields=${fields}`).pipe(
      map((data) =>
        data
          .filter((item) => item.cca3 && item.name?.common)
          .map((item) => ({
            name: {
              common: item.name.common,
              official: item.name.official,
              nativeName: item.name.nativeName,
            },
            cca3: item.cca3,
            capital: item.capital || [],
            region: item.region,
            population: item.population,
            flags: item.flags,
            borders: item.borders || [],
            subregion: item.subregion,
            tld: item.tld,
            currencies: item.currencies, 
            languages: item.languages,
          }))
      ),
      catchError(this.handleError)
    );
  }

  getCountryByCode(code: string): Observable<Country> {
    return this.http.get<any>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((item) => ({
        name: {
          common: item.name.common,
          official: item.name.official,
          nativeName: item.name.nativeName,
        },
        cca3: item.cca3,
        capital: item.capital || [],
        region: item.region,
        population: item.population,
        flags: item.flags,
        borders: item.borders || [],
        subregion: item.subregion,
        tld: item.tld,
        currencies: item.currencies,
        languages: item.languages,
      })),
      catchError(this.handleError)
    );
  }

  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/alpha?codes=${codes.join(',')}`)
      .pipe(
        map((data) =>
          data.map((item) => ({
            name: {
              common: item.name.common,
              official: item.name.official,
              nativeName: item.name.nativeName,
            },
            cca3: item.cca3,
            capital: item.capital || [],
            region: item.region,
            population: item.population,
            flags: item.flags,
            borders: item.borders || [],
            subregion: item.subregion,
            tld: item.tld,
            currencies: item.currencies,
            languages: item.languages,
          }))
        ),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error.message);
    return throwError(
      () => new Error('Failed to fetch country data. Please try again later.')
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Country } from '../../models/country.interface';
import { Router } from '@angular/router';
import { loadCountries, selectCountry } from '../../store/country.actions';
import { selectFilteredCountries } from '../../store/country.selectors';
import { PopulationPipe } from '../../pipes/population.pipe';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, FormsModule, PopulationPipe],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss',
})
export class CountryCardComponent implements OnInit {
  countries$: Observable<Country[]>;

  constructor(private store: Store, private router: Router) {
    this.countries$ = this.store.select(selectFilteredCountries);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCountries());
  }

  selectCountry(country: Country) {
    this.store.dispatch(selectCountry({ code: country.cca3 }));
    this.router.navigate(['/countries', country.cca3]);
  }
}

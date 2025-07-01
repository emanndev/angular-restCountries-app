import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.interface';
import {
  loadCountryByCode,
  selectCountry,
} from '../../store/country.actions';
import {
  selectSelectedCountry,
  selectLoading,
  selectError,
} from '../../store/country.selectors';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  country$: Observable<Country | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

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
    this.route.params.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.store.dispatch(loadCountryByCode({ code }));
      }
    });
  }

  goBack() {
    this.router.navigate(['/countries']);
  }

  selectBorderCountry(code: string) {
    this.store.dispatch(selectCountry({ code }));
    this.router.navigate(['/countries', code]);
  }
}
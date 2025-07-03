import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { setTheme } from '../../store/country.actions';
import { selectTheme } from '../../store/country.selectors';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  theme$: Observable<'light' | 'dark'>;

  constructor(private store: Store) {
    this.theme$ = this.store.select(selectTheme);
  }

  ngOnInit() {
    this.theme$.subscribe((theme) => {
      document.body.setAttribute('data-theme', theme);
    });
  }

  toggleTheme() {
    this.theme$.pipe(take(1)).subscribe((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      this.store.dispatch(setTheme({ theme: newTheme }));
    });
  }
}

import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs';

import { AutoUnsubscribe } from '../shared/decorators/unsubscriber';
import { titles } from '../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
@AutoUnsubscribe
export class HeaderComponent {
  title!: string;
  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const segments = (event as NavigationEnd).url.split('/');
        const titleKey = Object.keys(titles).find((key) => {
          const keySegments = key.split('/');
          return (
            keySegments.length === segments.length &&
            keySegments.every(
              (segment, i) => segment === segments[i] || segment === ':id',
            )
          );
        });
        this.title = titles[titleKey as keyof typeof titles].replace(
          ':id',
          segments[segments.indexOf(':id') + 1] || '',
        );
      });
  }
}

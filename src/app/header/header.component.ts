import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';

import { AutoUnsubscribe } from '../shared/decorators/unsubscriber';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
@AutoUnsubscribe
export class HeaderComponent implements OnInit {
  title!: string;
  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute.firstChild?.data.subscribe(
          (el) => (this.title = (el as { title: string }).title),
        );
      });
  }
}

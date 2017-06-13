import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Examlr.com';

  constructor(
    private router: Router) { }

  gotoSearch(term: string): void {
    let link = ['/search', term];
    this.router.navigate(link);
  }
}

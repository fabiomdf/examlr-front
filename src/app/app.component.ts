import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './user/auth.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Examlr.com';
  user: User = this.auth.getCurrentUser();

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  public reloadUser() {
    this.user = this.auth.getCurrentUser();
  }

  gotoSearch(term: string): void {
    const link = ['/search', term];
    this.router.navigate(link);
  }
}

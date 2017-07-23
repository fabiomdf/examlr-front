import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loginSuccess = false;
  loginError = false;

  constructor(
    private userServive: UserService,
    private authService: AuthService,
    private app: AppComponent
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.userServive.loginUser(this.user).subscribe(res => {

      this.authService.setCurrentUser(res.user);
      this.authService.setAccessTokenId(res.id);

      this.loginSuccess = true;
      this.loginError = false;

      this.app.reloadUser();

    }, err => {

      this.loginSuccess = false;
      this.loginError = true;

      // console.log('ERRO', err);

    });
  }

}

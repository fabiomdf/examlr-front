import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private userServive: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.userServive.loginUser(this.user).subscribe(res => {

      this.authService.setCurrentUser(res.user);
      this.authService.setAccessTokenId(res.id);

    }, err => {

      console.log('ERRO', err);

    });
  }

}

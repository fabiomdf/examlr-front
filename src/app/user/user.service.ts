import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user';

@Injectable()
export class UserService {

  url = 'http://localhost:3000/api';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(protected http: Http) { }

  newUser(user: User): Observable<User> {

    const url = this.url + '/Users';

    return this.http.post(url, user, { headers: this.headers })
      .map(res => res.json())
      .catch(err => {
        return Observable.throw(err);
      });
  }

  loginUser(user: User): Observable<any> {
    const url = this.url + '/Users/Login?include=User';

    return this.http.post(url, { email: user.email, password: user.password }, { headers: this.headers })
      .map(res => res.json())
      .catch(err => {
        return Observable.throw(err);
      });
  }

}

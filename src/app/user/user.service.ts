import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  url = 'http://localhost:3000/api';
  headers = new Headers({'Content-Type': 'application/json'});

  constructor(protected http: Http) { }

  newUser(user: User): Observable<User> {

    const url = this.url + '/Users';

    return this.http.post(url, user, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

}

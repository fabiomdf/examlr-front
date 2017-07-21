import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { User } from './user';

@Injectable()
export class AuthService {

  constructor() { }

  setCurrentUser(user: User) {
    const userStr = JSON.stringify(user);
    localStorage.setItem('CurrentUser', userStr);
  }

  getCurrentUser(): User {
    const userStr = localStorage.getItem('CurrentUser');
    if (!isNullOrUndefined(userStr)) {
      const user: User = JSON.parse(userStr);
      return user;
    } else {
      return null;
    }
  }

  setAccessTokenId(token: string) {
    localStorage.setItem('AccessTokenId', token);
  }

  getAccessTokenId(): string {
    return localStorage.getItem('AccessTokenId');
  }
}

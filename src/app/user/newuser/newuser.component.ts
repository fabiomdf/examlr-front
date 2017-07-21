import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
  providers: [UserService]
})
export class NewuserComponent implements OnInit {

    user: User = new User();

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    newUser() {
        this.user.username = this.user.username.trim();
        this.user.email = this.user.email.trim();
        this.user.password = this.user.password.trim();

        console.log(this.user);

        if (!this.user.username || !this.user.email || !this.user.password) { return; }

        this.userService.newUser(this.user).subscribe(res => {
            console.log('sucesso:' + res.id);
        }, err => {
            console.log('erro:' + err);
        });
    }

    ngOnInit() { }

}

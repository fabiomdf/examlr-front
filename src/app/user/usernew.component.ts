import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from './user';
import { UserService } from './user.service';

@Component({
    moduleId: module.id,
    selector: 'app-usernew-component',
    templateUrl: 'usernew.component.html',
    providers: [UserService]
})
export class UserNewComponent implements OnInit {

    user: User;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    newUser(username: string, email: string, password: string) {

        this.user = new User();

        this.user.username = username.trim();
        this.user.email = email.trim();
        this.user.password = password.trim();

        console.log(this.user);

        if (!username || !email || !password) { return; }

        this.userService.newUser(this.user).subscribe(res => {
            console.log('sucesso:' + res.id);
        }, err => {
            console.log('erro:' + err);
        });
    }

    ngOnInit() { }
}

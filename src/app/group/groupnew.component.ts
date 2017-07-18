import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'groupnew-component',
    templateUrl: 'groupnew.component.html'
})
export class GroupNewComponent implements OnInit {

    group: Group;

    constructor(
        private groupService: GroupService,
        private router: Router
    ) { }

    newGroup(name: string, about: string): void {
        name = name.trim();
        about = about.trim();

        if (!name || !about) { return; }

        this.groupService.newGroup(name, about)
            .then(result => {
                this.group = result;
                this.router.navigate([`group/${this.group.id}`]);
            });
    }

    ngOnInit() {

     }
}

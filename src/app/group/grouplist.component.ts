import { Component, OnInit } from '@angular/core';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'grouplist-component',
    templateUrl: 'grouplist.component.html',
    providers: [GroupService]
})
export class GroupListComponent implements OnInit {

    groups: Group[];

    constructor(
        private groupService: GroupService
    ) { }

    getGroups(): void {
        this.groupService.getGroups().then(result => this.groups = result);
    }

    ngOnInit() {
        this.getGroups();
     }
}

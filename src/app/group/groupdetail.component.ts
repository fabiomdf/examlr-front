import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'groupdetail.component',
    templateUrl: 'groupdetail.component.html',
    providers: [GroupService]
})
export class GroupDetailComponent implements OnInit {

    group: Group;

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        private location: Location,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.group = new Group;

        this.route.params
            .switchMap((params: Params) => this.groupService.getGroupById(params['id']))
            .subscribe(result => this.group = result);
    }
}

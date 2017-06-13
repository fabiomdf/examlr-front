import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Group } from "./group";
import { GroupService } from "./group.service";

@Component({
    moduleId: module.id,
    selector: 'groupsearch.component',
    templateUrl: 'groupsearch.component.html'
})
export class GroupSearchComponent implements OnInit {

    groups: Array<Group>;
    term: string;

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        private location: Location,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.groups = new Array<Group>();

        this.route.params.subscribe(params => this.term = params['term']);

        this.route.params
            .switchMap(() => this.groupService.searchGroups(this.term))
            .subscribe(result => this.groups = result);
    }
}
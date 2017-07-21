import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Group } from '../group/group';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'categorynew-component',
    templateUrl: 'categorynew.component.html',
    providers: [CategoryService]
})
export class CategoryNewComponent implements OnInit {

    group: Group;
    categories: Category[];

    @Input()
    set selectedGroup(group: Group) {
        if (group) {
            this.group = group;
            this.getCategoriesByGroup();
        }
    }

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    newCategory(name: string, groupId: string): void {
        name = name.trim();
        groupId = groupId.trim();

        if (!name || !groupId) { return; }

        this.categoryService.newCategory(name, groupId)
            .then(result => {
                this.categories.push(result);
            });
    }

    getCategoriesByGroup(): void {
        this.categoryService
            .getCategoriesByGroupId(this.group.id)
            .then(result => this.categories = result);
    }

    delCategory(category: Category): void {
        this.categoryService.delCategory(category.id).then(() => {
            this.categories = this.categories.filter(c => c !== category);
        });
    }

    ngOnInit() {

    }
}

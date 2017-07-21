import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Group } from '../group/group';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'categoryselect-component',
  templateUrl: './categoryselect.component.html',
  providers: [CategoryService]
})
export class CategorySelectComponent {
  group: Group;
  categories: Category[];
  categoryModel: Category;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.categories.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: { name: string }) => x.name;

  // tslint:disable-next-line:member-ordering
  @Output() categorySelected = new EventEmitter();

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
  ) {
  }

  selectItem(item): void {
    this.categoryModel = item.item;
    this.categorySelected.emit(this.categoryModel);
  }

  getCategoriesByGroup(): void {
    this.categoryService
      .getCategoriesByGroupId(this.group.id)
      .then(result => this.categories = result);
  }

  newCategory(name: string, groupId: string): void {
    name = name.trim();
    groupId = groupId.trim();

    if (!name || !groupId) { return; }

    this.categoryService.newCategory(name, groupId)
      .then(result => {
        this.categoryModel = result;
        this.categories.push(this.categoryModel);
        this.categorySelected.emit(this.categoryModel);
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.categoryModel = new Category();
    this.categoryModel.name = '';
  }

}

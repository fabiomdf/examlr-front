import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Group } from "../group/group";
import { Category } from "./category";
import { CategoryService } from "./category.service";

@Component({
  selector: 'categoryselect-component',
  templateUrl: './categoryselect.component.html'
})
export class CategorySelectComponent {
  group: Group;
  categories: Category[];
  categoryModel: Category;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.categories.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: { name: string }) => x.name;

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

  selectCategory(category): void {
    this.categorySelected.emit(category);
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

  ngOnInit() {
    this.categoryModel = new Category();
    this.categoryModel.name = "";
  }

}
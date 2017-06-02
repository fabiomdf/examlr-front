import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Group } from "../group/group";
import { Category } from "../category/category";
import { CategoryService } from "../category/category.service";
import { Question } from "./question";
import { QuestionService } from "./question.service";

@Component({
    moduleId: module.id,
    selector: 'questiondetail-component',
    templateUrl: 'questiondetail.component.html'
})
export class QuestionDetailComponent implements OnInit {

    group: Group;
    categories: Category[];
    question: Question;
    selectedCategory: Category;

    @Input()
    set selectedGroup(group: Group) {
        if (group) {
            this.group = group;
            this.getCategoriesByGroup();
        }
    }

    constructor(
        private categoryService: CategoryService,
        private questionService: QuestionService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    newQuestion(questionText: string, answerText: string, category: Category): void {
        
        questionText = questionText.trim();
        answerText = answerText.trim();

        if (!questionText || !answerText || !category) { return; }

        this.questionService.newQuestion(questionText, answerText, category.id)
            .then(result => {
                this.question = result;
            });
    }

    getCategoriesByGroup(): void {
        this.categoryService
            .getCategoriesByGroupId(this.group.id)
            .then(result => this.categories = result);
    }

    ngOnInit() {
        this.group = new Group();
    }
}
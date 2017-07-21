import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Group } from '../group/group';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { Question } from './question';
import { QuestionService } from './question.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'questionlist-component',
    templateUrl: 'questionlist.component.html',
    providers: [QuestionService, CategoryService]
})
export class QuestionListComponent implements OnInit {

    closeResult: string;
    group: Group;
    categories: Category[];
    questions: any[];
    selectedCategory: Category;
    selectedQuestionIndex: number;

    @Input()
    set selectedGroup(group: Group) {
        if (group) {
            this.group = group;
            this.getQuestionsByGroupId();
        }
    }

    constructor(
        private categoryService: CategoryService,
        private questionService: QuestionService,
        private route: ActivatedRoute,
        private location: Location,
        private modalService: NgbModal
    ) { }

    getQuestionsByGroupId(): void {
        this.questionService
            .getQuestionsByGroupId(this.group.id, false)
            .then(result => this.questions = result);
    }

    openNewQuestion(content) {
        const options: NgbModalOptions = { size: 'lg' };
        this.modalService.open(content, options).result.then((result) => {
            this.getQuestionsByGroupId();
        }, (reason) => {
            this.getQuestionsByGroupId();
        });
    }

    openDetailQuestion(content) {
        const options: NgbModalOptions = { size: 'lg' };
        this.modalService.open(content, options).result.then((result) => {
            this.getQuestionsByGroupId();
        }, (reason) => {
            this.getQuestionsByGroupId();
        });
    }

    delQuestion(question: Question) {
        this.questionService.delQuestion(question.id).then(() => {
            this.questions = this.questions.filter(q => q !== question);
        });
    }

    ngOnInit() {

    }
}

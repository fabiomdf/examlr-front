import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Group } from "../group/group";
import { Category } from "../category/category";
import { CategoryService } from "../category/category.service";
import { Question } from "./question";
import { QuestionService } from "./question.service";

@Component({
    moduleId: module.id,
    selector: 'questionlist-component',
    templateUrl: 'questionlist.component.html'
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
            this.getCategoriesByGroup();
        }
    }

    constructor(
        private categoryService: CategoryService,
        private questionService: QuestionService,
        private route: ActivatedRoute,
        private location: Location,
        private modalService: NgbModal
    ) { }

    getCategoriesByGroup(): void {
        this.categoryService
            .getCategoriesByGroupId(this.group.id)
            .then(result => this.categories = result);
    }

    getQuestionsByCategory(): void {
        this.questionService
            .getQuestionsByCategoryId(this.selectedCategory.id)
            .then(result => this.questions = result);
    }

    setUpVote(questionId: string): void {
        var retorno = new Question();
        this.questionService.setUpVote(questionId).then(result => {
            retorno = result;
            this.getQuestionsByCategory();
        });
    }

    setDownVote(questionId: string): void {
        var retorno = new Question();
        this.questionService.setDownVote(questionId).then(result => {
            retorno = result;
            this.getQuestionsByCategory();
        });
    }

    openNewCategory(content) {
        let options: NgbModalOptions = { size: 'lg' };
        this.modalService.open(content, options).result.then((result) => {
            this.getCategoriesByGroup();
        }, (reason) => {
            this.getCategoriesByGroup();
        });
    }

    openNewQuestion(content) {
        let options: NgbModalOptions = { size: 'lg' };
        this.modalService.open(content, options).result.then((result) => {
            this.getQuestionsByCategory();
        }, (reason) => {
            this.getQuestionsByCategory();
        });
    }

    openDetailQuestion(content) {
        let options: NgbModalOptions = { size: 'lg' };
        this.modalService.open(content, options).result.then((result) => {
            this.getQuestionsByCategory();
        }, (reason) => {
            this.getQuestionsByCategory();
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
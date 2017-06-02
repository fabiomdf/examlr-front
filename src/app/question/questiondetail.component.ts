import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from "./question";
import { QuestionService } from "./question.service";

@Component({
    moduleId: module.id,
    selector: 'questiondetail-component',
    templateUrl: 'questiondetail.component.html'
})
export class QuestionDetailComponent implements OnInit {
    
    questions: any;
    questionIndex: number;
    questionsToCompare: any;

    @Input()
    set selectedQuestionIndex(index: number) {
        this.questionIndex = 0;
        if (index) {
            this.questionIndex = index;
        }
    }

    @Input()
    set questionsToShow(questions: Array<any>) {
        if (questions) {
            this.questions = questions;
        }
    }

    @Input()
    set setQuestionsToCompare(questions: Array<any>) {
        if (questions) {
            this.questionsToCompare = questions;
        }
    }

    constructor(
        private questionService: QuestionService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        
    }
}
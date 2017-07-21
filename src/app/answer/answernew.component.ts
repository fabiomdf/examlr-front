import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../question/question';
import { Answer } from './answer';
import { AnswerService } from './answer.service';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'answernew-component',
    templateUrl: 'answernew.component.html',
    providers: [AnswerService]
})

export class AnswerNewComponent implements OnInit {

    answer: Answer;
    answers: Answer[];
    question: Question;

    @Input()
    set selectedQuestion(question: Question) {
        if (question) {
            this.question = question;
            this.getAnswersByQuestion();
        }
    }

    constructor(
        private answerService: AnswerService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    newAnswer(optionText: string, correctAnswer: boolean, questionId: string): void {

        optionText = optionText.trim();
        questionId = questionId.trim();

        if (!optionText || !questionId) { return; }

        this.answerService.newAnswer(optionText, correctAnswer, questionId)
            .then(result => this.answers.push(result))
    }

    getAnswersByQuestion(): void {
        this.answerService
            .getAnswersByQuestionId(this.question.id)
            .then(result => this.answers = result);
    }

    delAnswer(answer: Answer): void {
        this.answerService.delAnswer(answer.id).then(() => {
            this.answers = this.answers.filter(a => a !== answer);
        });
    }

    ngOnInit() {

    }
}
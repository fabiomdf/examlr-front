import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Group } from "../group/group";
import { Question } from "../question/question";
import { QuestionService } from "../question/question.service";
import { Answer } from "../answer/answer";

@Component({
    moduleId: module.id,
    selector: 'simulation-component',
    templateUrl: 'simulation.component.html'
})
export class SimulationComponent implements OnInit {

    qindex: number;
    questions: Array<any>;
    questionsSimulate: Array<any>;
    group: Group;
    simulationResults: Array<boolean>;
/*
    @Input()
    set selectedGroup(_group: Group) {
        if (_group) {
            this.group = _group;
            //this.getQuestionsByGroupId();
        }
    }
*/
    constructor(
        private questionService: QuestionService,
        private route: ActivatedRoute,
        private location: Location) { }

    getQuestionsByGroupId(groupId: string): void {
        this.questionService
            .getQuestionsByGroupId(groupId)
            .then(result => {
                this.questions = result;
                this.setAnswersClear(result);
            });
    }

    setAnswersClear(questions: Array<any>): void {
        // Cloning the object
        this.questionsSimulate = JSON.parse(JSON.stringify(questions));
        // Set all answers to false
        this.questionsSimulate.forEach(q => {
            q.answers.forEach(a => {
                a.correctAnswer = false;
            });
        });
    }

    setAnswerCheck(qindex: number, aindex: number, itemChecked: boolean): void {
        this.questionsSimulate[qindex].answers[aindex].correctAnswer = itemChecked;
    }

    finishSimulation(): void {
        this.simulationResults = Array<boolean>();

        let i = 0;
        for (let q of this.questions) {
            this.simulationResults[i] = (JSON.stringify(q) == JSON.stringify(this.questionsSimulate[i])) ? true : false; i++;
        }
    }

    ngOnInit() {
        this.qindex = 0;

        this.route.params.subscribe(params => {
            this.getQuestionsByGroupId(params['id']);
        });
    }
}
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Group } from "../group/group";
import { GroupService } from "../group/group.service";
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
    simulationResults: Array<boolean>;
    group: Group;

    constructor(
        private groupService: GroupService,
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

    getGroupById(groupId): void {
        this.groupService
            .getGroupById(groupId)
            .then(result => this.group = result);
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

    /**
     * Compare the real questions / answers and the user questions / answers
     */
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
            this.getGroupById(params['id']);
            this.getQuestionsByGroupId(params['id']);
        });
    }
}
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

    @Input()
    set selectedGroup(group: Group) {
        if (group) {
            this.group = group;
            this.getQuestionsByGroupId();
        }
    }

    constructor(private questionService: QuestionService) { }

    getQuestionsByGroupId(): void {
        this.questionService
            .getQuestionsByGroupId(this.group.id)
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
        let i = 0;
        this.questions.forEach(element => {
            if (JSON.stringify(element) == JSON.stringify(this.questionsSimulate[i])) {
                console.log(`Pregunta: ${i} está Correta`);
            } else {
                console.log(`Pregunta: ${i} está Errada`);
            }
            i++;
        });
    }

    ngOnInit() {
        this.qindex = 0;
    }
}
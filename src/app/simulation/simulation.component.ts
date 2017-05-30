import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Group } from "../group/group";
import { Question } from "../question/question";
import { QuestionService } from "../question/question.service";

@Component({
    moduleId: module.id,
    selector: 'simulation-component',
    templateUrl: 'simulation.component.html'
})
export class SimulationComponent implements OnInit {
    
    index: number;
    questions: any[];
    questionsSimulate: any[];
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
            });
    }

    ngOnInit() {
        this.index = 0;
     }


}
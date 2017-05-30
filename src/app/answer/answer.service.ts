import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Answer } from "./answer";

@Injectable()
export class AnswerService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    getAnswers(): Promise<Answer[]> {
        return this.http.get(this.url + "/Answers")
            .toPromise()
            .then(res => res.json() as Answer[])
            .catch(this.handleError);
    }

    getAnswersByQuestionId(questionId: string): Promise<Answer[]> {
        return this.http.get(this.url + "/Questions/" + questionId + "/answers")
            .toPromise()
            .then(res => res.json() as Answer[])
            .catch(this.handleError);
    }

    newAnswer(optionText: string, correctAnswer: boolean, questionId: string): Promise<Answer> {
        return this.http
            .post(this.url + "/Answers",
            JSON.stringify({
                optionText: optionText,
                correctAnswer: correctAnswer,
                questionId: questionId
            }),
            { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Answer)
            .catch(this.handleError);
    }

    delAnswer(id: string): Promise<void> {
        const url = `${this.url}/Answers/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
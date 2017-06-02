import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Question } from "./question";

@Injectable()
export class QuestionService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    getQuestions(): Promise<Question[]> {
        return this.http.get(this.url + "/Questions")
            .toPromise()
            .then(res => res.json() as Question[])
            .catch(this.handleError);
    }

    getQuestionsByCategoryId(categoryId: string): Promise<any[]> {
        return this.http.get(this.url + "/Categories/" + categoryId + "/questions?filter[include]=answers")
            .toPromise()
            .then(res => res.json() as any[])
            .catch(this.handleError);
    }

    getQuestionsByGroupId(groupId: string): Promise<any[]> {
        const url = `${this.url}/Categories?filter[include][questions][answers]&filter[where][groupId]=${groupId}`;
        return this.http.get(url)
            .toPromise()
            .then(res => {
                var categories = res.json() as any[];
                var result = new Array<any>();
                for (let c of categories) {
                    for (let q of c.questions) {
                        result.push(q);
                    }
                }
                return this.shuffleArray(result);
            })
            .catch(this.handleError);
    }

    /**
     * Get the Question Details and the corresponding Answers using Question Id
     */
    getQAByQuestionId(questionId: string): Promise<any> {
        let url = `${this.url}/questions?filter[include]=answers&filter[where][id]=${questionId}`;
        return this.http.get(url)
            .toPromise()
            .then(res => {
                let result = res.json() as any;
                return result[0];
            })
            .catch(this.handleError);
    }

    setUpVote(questionsId: string): Promise<Question> {
        const url = `${this.url}/Questions/${questionsId}`;
        var result = this.http.get(url)
            .toPromise()
            .then(res => {
                // buscando o upVote mais atualizado
                var question = new Question();
                question = res.json() as Question;
                // atualizando o upVote somando + 1
                question.upVote = question.upVote + 1;
                return this.http.patch(url, question).toPromise().then(res => res.json() as Question).catch(this.handleError);
            })
            .catch(this.handleError);
        return result;
    }

    setDownVote(questionsId: string): Promise<Question> {
        const url = `${this.url}/Questions/${questionsId}`;
        var result = this.http.get(url)
            .toPromise()
            .then(res => {
                // buscando o downVote mais atualizado
                var question = new Question();
                question = res.json() as Question;
                // atualizando o downVote somando + 1
                question.downVote = question.downVote + 1;
                return this.http.patch(url, question).toPromise().then(res => res.json() as Question).catch(this.handleError);
            })
            .catch(this.handleError);
        return result;
    }

    newQuestion(questionText: string, answerText: string, categoryId: string): Promise<Question> {
        return this.http
            .post(this.url + "/Questions",
            JSON.stringify({
                questionText: questionText,
                answerText: answerText,
                categoryId: categoryId,
                createdAt: Date.now(),
                upVote: 0,
                downVote: 0
            }),
            { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Question)
            .catch(this.handleError);
    }

    delQuestion(id: string): Promise<void> {
        const url = `${this.url}/Questions/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private shuffleArray(_array: Array<Question>): Array<Question> {
        for (let i = _array.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [_array[i - 1], _array[j]] = [_array[j], _array[i - 1]];
        }
        return _array;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
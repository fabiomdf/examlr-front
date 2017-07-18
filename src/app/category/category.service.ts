import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Category } from './category';

@Injectable()
export class CategoryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.url + '/Categories')
            .toPromise()
            .then(res => res.json() as Category[])
            .catch(this.handleError);
    }

    getCategoriesByGroupId(groupId: string): Promise<Category[]> {
        return this.http.get(this.url + '/Groups/' + groupId + '/categories')
            .toPromise()
            .then(res => res.json() as Category[])
            .catch(this.handleError);
    }

    newCategory(name: string, groupId: string): Promise<Category> {
        return this.http
            .post(this.url + '/Categories',
            JSON.stringify({
                name: name.substring(0, 128),
                groupId: groupId
            }),
            { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Category)
            .catch(this.handleError);
    }

    delCategory(id: string): Promise<void> {
        const url = `${this.url}/Categories/${id}`;
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
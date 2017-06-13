import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Group } from "./group";

@Injectable()
export class GroupService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    getGroups(): Promise<Group[]> {
        return this.http.get(this.url + "/Groups")
            .toPromise()
            .then(res => res.json() as Group[])
            .catch(this.handleError);
    }

    getGroupById(id: string): Promise<Group> {
        return this.http.get(this.url + "/Groups/" + id)
            .toPromise()
            .then(res => res.json() as Group)
            .catch(this.handleError);
    }

    searchGroups(term: string): Promise<Group[]> {
        return this.http.get(this.url + "/Groups?filter[where][name][like]=" + term)
            .toPromise()
            .then(res => res.json() as Group[])
            .catch(this.handleError);
    }

    newGroup(name: string, about: string): Promise<Group> {
        return this.http
            .post(this.url + "/Groups",
            JSON.stringify({
                name: name.substring(0, 128),
                about: about.substring(0, 512),
                createdAt: Date.now()
            }),
            { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Group)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
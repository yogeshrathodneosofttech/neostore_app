import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ApiData {
	constructor(private http: Http) {}

	headers = new Headers({
    'Content-Type': 'application/json'
  });

	getData(url) {
		return this.http.get(url);
	}

	postLogin(url, data) {
		return this.http.post(url, data, this.headers).map( res => res.json() );
	}

	postRegister(url, data) {
		return this.http.post(url, data, this.headers).map( res => res.json() );
	}
}
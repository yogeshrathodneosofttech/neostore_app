import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as Globals from '../globals';

@Injectable()

export class ApiData {
	constructor(private http: Http) {}

	headers = new Headers({
    'Content-Type': 'application/json'
  });

  // this.headers.append('access_token', Globals.globals.userAccessToken );

	getData(url) {
		return this.http.get(url).map( res => res.json() );
	}

	postRequest(url, data) {
		return this.http.post(url, data, this.headers).map( res => res.json() );
	}

	addToCart(url, data, headers) {
		return this.http.post(url, data, headers).map( res => res.json() );
	}
}
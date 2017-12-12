import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class DimantedeskService {

  constructor(private http: Http) {}

  createAuthorizationHeader(headerstoUpdate: Headers, dimantedeskParam: any) {
      console.log('dimantedeskParam are' + dimantedeskParam);
      headerstoUpdate.append('Authorization', 'WSSE profile="UsernameToken"');
      headerstoUpdate.append('X-WSSE', dimantedeskParam);
  }

  get(url, dimantedeskParam) {
    const headers = new Headers();
    console.log('headers sent is' + JSON.stringify(headers));
    this.createAuthorizationHeader(headers, dimantedeskParam);
    console.log('headers received is' + JSON.stringify(headers));
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, dimantedeskParam, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers, dimantedeskParam);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}

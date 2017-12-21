import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class DimantedeskService {

  constructor(private http: Http) {}

  createAuthorizationHeader(headerstoUpdate: Headers, dimantedeskParam: any) {
      console.log('dimantedeskParam are' + dimantedeskParam);
      // headerstoUpdate.append('Access-Control-Request-Method', 'GET');
      // headerstoUpdate.append('Access-Control-Request-Headers', 'X-Custom-Header');
      // headerstoUpdate.set('Access-Control-Allow-Origin', '*');
      headerstoUpdate.append('Authorization', 'WSSE profile="UsernameToken"');
      headerstoUpdate.append('X-WSSE', dimantedeskParam);
      // headerstoUpdate.append('Content-Type', 'application/json');
  }

  get(url, dimantedeskParam) {
    const headers = new Headers();
     this.createAuthorizationHeader(headers, dimantedeskParam);
    // console.log('headers received is' + dimantedeskParam.toString());
    // console.log('headers stringify received is' + JSON.stringify(dimantedeskParam));

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

import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import {sh1Object} from '../../sh1.js';
import {base64Object} from '../../base64.js';

// import 'crypto';

// import 'angular-wsse';

// import {wsseservice} from 'angular-wsse';
// declare var require: any;
// const wsse = require('wsse');
import { DimantedeskService } from '../shared/rest-header.service';
// declare var temp: any;
// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) {}
}
@Injectable()
export class ChatService {
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);
  constructor(
    protected http: Http,
    private dimantedeskService: DimantedeskService) {
}
  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot');
                  // to get the keys res.result.parameters.keyname
                  console.log('output is  ' + JSON.stringify(res.result));
                  console.log('output is  ' + res.result.resolvedQuery);
                //  const temp1 =  wsseservice.getWSSEHeader('diamantedesk', '7c19496a1a40bcee51ebeefbaaed9d115d304d81');
                //  console.log('getWSSEHeader  ' + temp1);
                  if (res.result.resolvedQuery === 'r') {
// tring to hit manuaalyy
                   const dimantedeskParam = this.createDiamentedDeskParameter('diamantedesk', 'f8d1134222d0c393bf805f8104444141437fcc63');
                    // tslint:disable-next-line:max-line-length
                    // const token = wsse({ username: 'diamantedesk', password: 'f8d1134222d0c393bf805f8104444141437fcc63', sha1encoding: 'Base64'});
                    // tslint:disable-next-line:max-line-length
                    // const usernameToken = new UsernameToken({ username: 'diamantedesk', password: 'f8d1134222d0c393bf805f8104444141437fcc63',
                    // sha1encoding: 'hex' });
                    // const dimantedeskParam = wsseservice.getWSSEHeader('diamantedesk', 'f8d1134222d0c393bf805f8104444141437fcc63');
                  //  const dimantedeskParam = token.getWSSEHeader({ nonceBase64: true });
                    console.log('dimantedeskParam'  + dimantedeskParam); // { nonceBase64: true }

                    this.dimantedeskService.get('http://104.154.217.246/api/rest/latest/desk/branches',
                    dimantedeskParam).subscribe(data => {
                      const results = data['results'];
                      console.log('output is  ' + results);
                    },
                    error => {
                      console.log('error is' + error);
                    });
                  }
                  this.update(botMessage);
               });
  }

  createDiamentedDeskParameter(username: any, password: any) {
    const nonce = this.generateNonce(16);
    const nonce64 = base64Object.base64encode(nonce);
    const created = this.getW3CDate(new Date());
    const temp = nonce + created + password;
    let passwordDigest = sh1Object.b64_sha1(nonce + created + 'f8d1134222d0c393bf805f8104444141437fcc63');
    // tslint:disable-next-line:max-line-length
    // const finalParameter = 'UsernameToken Username=\""username"\", PasswordDigest=\""passwordDigest"\", Nonce=\""nonce64"\", Created=\""created"\"';
   // tslint:disable-next-line:whitespace
   // tslint:disable-next-line:max-line-length
   // tslint:disable-next-line:whitespace
   passwordDigest = passwordDigest.concat('=');
   const finalParameter = 'UsernameToken Username="'+username+'", PasswordDigest="'+passwordDigest+'", Nonce="'+nonce64+'", Created="'+created+'"';
    // tslint:disable-next-line:max-line-length
    // const finalParameter ='UsernameToken Username="diamantedesk", PasswordDigest="Nz0/kTIEGdCx1Qu7pBeIThOlhAk=", Nonce="MmMzYTdhYzkxOTI1ODlkYw==", Created="2017-12-19T07:24:19Z"';
    return finalParameter;
  }

  getW3CDate(date) {
    const yyyy = date.getUTCFullYear();
    let mm = (date.getUTCMonth() + 1);
    if (mm < 10) {
      mm = '0' + mm;
    }
    let dd = (date.getUTCDate());
    if (dd < 10) {
      dd = '0' + dd;
    }
    let hh = (date.getUTCHours());
    if (hh < 10) {
      hh = '0' + hh;
    }
    let mn = (date.getUTCMinutes());
    if (mn < 10) {mn = '0' + mn;
  }
    let ss = (date.getUTCSeconds());
    if (ss < 10) { ss = '0' + ss;
  }
    return yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + mn + ':' + ss + 'Z';
}

  generateNonce(length) {
    const nonceChars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += nonceChars.charAt(Math.floor(Math.random() * nonceChars.length));
    }
    return result;
}
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }
}

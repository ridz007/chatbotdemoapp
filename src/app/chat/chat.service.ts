import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import {UsernameToken} from 'wsse';

import 'wsse';
import 'crypto';
import { DimantedeskService } from '../shared/rest-header.service';
declare var require: any;
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

                    // tslint:disable-next-line:max-line-length
                    const usernameToken = new UsernameToken({ username: 'diamantedesk', password: 'f8d1134222d0c393bf805f8104444141437fcc63',
                    sha1encoding: 'hex' });
                    const dimantedeskParam = usernameToken.getWSSEHeader({ nonceBase64: true });
                    console.log(usernameToken.getWSSEHeader({ nonceBase64: true })); // { nonceBase64: true }

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
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }
}

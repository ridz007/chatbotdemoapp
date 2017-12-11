import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import {UsernameToken} from 'wsse';
import 'wsse';
import 'crypto';

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
  constructor(protected http: Http) {
}
  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    const usernameToken = new UsernameToken({ username: 'diamantedesk', password: '7c19496a1a40bcee51ebeefbaaed9d115d304d81' });
    // const wsse = require('wsse');
    // const token = UsernameToken({ username: 'diamantedesk', password: '7c19496a1a40bcee51ebeefbaaed9d115d304d81' });
    console.log(usernameToken.getWSSEHeader());

    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot');
                  // to get the keys res.result.parameters.keyname
                  console.log('output is  ' + JSON.stringify(res.result));
                  console.log('output is  ' + res.result.resolvedQuery);
                //  const temp1 =  wsseservice.getWSSEHeader('diamantedesk', '7c19496a1a40bcee51ebeefbaaed9d115d304d81');
                //  console.log('getWSSEHeader  ' + temp1);
                  if (res.result.resolvedQuery === 'create ticket') {
                    this.http.get('http://104.154.217.246/desk/tickets').subscribe(data => {
                      // Read the result field from the JSON response.
                      const results = data['results'];
                      console.log('output is  ' + results);
                      // tslint:disable-next-line:comment-format
                      // tslint:disable-next-line:max-line-length
                      // Username="diamantedesk", PasswordDigest="1MGIgj7fjeNLMUYfRWsb9yYAth0=", Nonce="SR+4QnGSpE4nQ+6ok1hddQ==", Created="2017-12-08T09:15:49+0000"
                   // Username== "diamantedesk", PasswordDigest="7c19496a1a40bcee51ebeefbaaed9d115d304d81", Nonce="", Created=""

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

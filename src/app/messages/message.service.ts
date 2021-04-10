import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          this.sortAndSend();
        },

        (error: any) => {
          console.log(error);
        }
      );
  }

  sortAndSend() {
    this.messageChangedEvent.next(this.messages.slice());
  }

  addMessage(message: Message) {
    if (!message) return;

    // make sure id of the new Message is empty
    message.id = '101';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ response: string; newMessage: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        message._id = responseData.newMessage._id;
        // message.id = responseData.newMessage.id;

        this.messages.push(responseData.newMessage);
        this.sortAndSend();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(
      '1',
      'Subject 1',
      'Can you meet at 4pm tomorrow?',
      'John Billman'
    ),
    new Message(
      '2',
      'Subject 2',
      'Hey Bro! I havent talked to you in forever! How are you?',
      'Josh Ax'
    ),
    new Message(
      '3',
      'Subject 3',
      'Can you pick up my kids from school tomorrow?',
      'Sarah Jones'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

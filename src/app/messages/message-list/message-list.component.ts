import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[];
  subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.subscription = this.messageService.messageChangedEvent.subscribe(
      (messageList: Message[]) => {
        this.messages = messageList;
      }
    );

    this.messageService.getMessages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

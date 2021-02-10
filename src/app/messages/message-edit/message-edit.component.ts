import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;

  currentSender = '99';

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onSendMessage() {
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;

    console.log(subjectValue);
    console.log(msgTextValue);
    console.log(this.currentSender);

    const newMessage = new Message(
      '1',
      subjectValue,
      msgTextValue,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}

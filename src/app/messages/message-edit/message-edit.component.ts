import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
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
  currentSender: Contact;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.contactService.getContact('101').subscribe((response) => {
      this.currentSender = response.contact;
    });
  }

  onSendMessage() {
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;

    const newMessage: Message = new Message(
      '',
      '101',
      subjectValue,
      msgTextValue,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);
    // this.router.navigate(['/messages']);

    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}

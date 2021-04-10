import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  senderName: any;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContact(this.message.id).subscribe((response) => {
      this.senderName = response.contact.name;
    });
  }
}

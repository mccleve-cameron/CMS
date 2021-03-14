import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {}

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    this.http
      .get(
        'https://cms-project-a35c5-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.contactChangedEvent.next(this.contacts.slice());
        },

        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  getMaxId(): number {
    let maxId: number = 0;

    for (const contact of this.contacts) {
      const currentId: number = Number(contact.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);

    console.log('stored called');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(
        'https://cms-project-a35c5-default-rtdb.firebaseio.com/contacts.json',
        contacts,
        { headers: headers }
      )
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }
  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
}

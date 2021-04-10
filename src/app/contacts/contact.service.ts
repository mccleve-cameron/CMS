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

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(
        'http://localhost:3000/contacts'
      )
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.sortAndSend();
        },

        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string) {
    // return this.contacts.find((contact) => contact.id === id);
    return this.http.get<{ message: string; contact: Contact }>(
      'http://localhost:3000/contacts/' + id
    );
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

  sortAndSend() {
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.contactChangedEvent.next(this.contacts.slice());
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        console.log('contact RESPONSE = ', responseData);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }
}

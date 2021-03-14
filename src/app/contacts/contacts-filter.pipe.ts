import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filteredContacts = [];

    if (term && term.length > 0) {
      filteredContacts = contacts.filter((contact: Contact) =>
        contact.name.toLocaleLowerCase().includes(term.toLowerCase())
      );
    }

    return filteredContacts.length > 0 ? filteredContacts : contacts;
  }
}

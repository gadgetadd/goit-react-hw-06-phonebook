import { useEffect, useState } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { TbPlaylistAdd } from 'react-icons/tb';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppTitle, SectionTitle, Wrapper, IconWrapper } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = newContact => {
    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExists) {
      return Report.info(
        'Enter correct information',
        `${newContact.name} is already in contacts`,
        'Ok'
      );
    }
    setContacts(prev => [...prev, newContact]);
  };

  const deleteHandler = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const filterHandler = e => {
    const { value } = e.currentTarget;
    setFilter(value.toLowerCase());
  };

  return (
    <Wrapper>
      <AppTitle>Phonebook</AppTitle>
      <SectionTitle>Add new contact</SectionTitle>
      <ContactForm onSubmit={formSubmitHandler} />
      <SectionTitle>Contacts</SectionTitle>
      <Filter value={filter} onChange={filterHandler} />
      {contacts.length === 0 ? (
        <IconWrapper>
          <TbPlaylistAdd size="150px" color="#0000001a" />
        </IconWrapper>
      ) : (
        <ContactList contacts={visibleContacts} onDelete={deleteHandler} />
      )}
    </Wrapper>
  );
};

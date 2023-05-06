import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux/store';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import { AppTitle, SectionTitle, Wrapper } from './App.styled';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wrapper>
          <AppTitle>Phonebook</AppTitle>
          <SectionTitle>Add new contact</SectionTitle>
          <ContactForm />
          <SectionTitle>Contacts</SectionTitle>
          <Filter />
          <ContactList />
        </Wrapper>
      </PersistGate>
    </Provider>
  );
};

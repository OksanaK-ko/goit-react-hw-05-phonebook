import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import shortid from 'shortid';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import s from './App.module.css';
import { CSSTransition } from 'react-transition-group';
import '../../css/animation.css';
import Alert from '../Alert/Alert';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    error: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componenetDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const newContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (contacts.find(({ name }) => name === data.name)) {
      this.setState(() => {
        return {
          error: true,
        };
      });

      setTimeout(() => {
        this.setState(() => {
          return {
            error: false,
          };
        });
      }, 3000);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      });
    }
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const filterContacts = this.getFilterContacts();
    const { filter, contacts } = this.state;
    return (
      <div className={s.container}>
        <CSSTransition
          in={this.state.error}
          appear={true}
          classNames="error"
          timeout={250}
          unmountOnExit
        >
          <Alert />
        </CSSTransition>

        <CSSTransition in={true} appear={true} classNames="fade" timeout={500}>
          <h1 className={s.title}>Phonebook</h1>
        </CSSTransition>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <CSSTransition
          in={contacts.length > 1}
          classNames="fade"
          timeout={500}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        <CSSTransition
          in={this.state.contacts.length > 0}
          classNames="fade"
          timeout={250}
          unmountOnExit
        >
          <ContactList
            contacts={filterContacts}
            onDeleteContact={this.deleteContact}
          />
        </CSSTransition>
      </div>
    );
  }
}

export default App;

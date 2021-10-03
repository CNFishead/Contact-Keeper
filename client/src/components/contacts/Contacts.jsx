import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  // init context
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered
          ? filtered.map((contact, indx) => {
              return (
                <CSSTransition
                  key={contact.id + indx}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              );
            })
          : contacts.map((contact, indx) => {
              return (
                <CSSTransition
                  key={contact.id + indx}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              );
            })}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;

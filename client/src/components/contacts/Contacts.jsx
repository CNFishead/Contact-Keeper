import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  // init context
  const { contacts, filtered, getContacts } = useContext(ContactContext);

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);
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
                  key={contact._id + indx}
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
                  key={contact._id + indx}
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

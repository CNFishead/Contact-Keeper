import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  // init context
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((contact, indx) => {
        return <ContactItem key={contact.id + indx} contact={contact} />;
      })}
    </Fragment>
  );
};

export default Contacts;

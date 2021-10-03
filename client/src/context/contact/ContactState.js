import React, { useReducer } from "react";
import { v4 } from "uuid";
import ContactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jane Johnson",
        email: "jane@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Jane lame Johnson",
        email: "janelj@gmail.com",
        phone: "111-111-0000",
        type: "personal",
      },
      {
        id: 3,
        name: "John Johnson",
        email: "john@gmail.com",
        phone: "111-111-2222",
        type: "professional",
      },
    ],
    current: null,
    // Need a piece of state to deal with filtered contacts
    filtered: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions

  // Add Contact
  const addContact = (contact) => {
    contact.id = v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        current: state.current,
        updateContact,
        filtered: state.filtered,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

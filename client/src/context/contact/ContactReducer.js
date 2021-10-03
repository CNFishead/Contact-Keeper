import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        //  spread original state, and than add to the contacts array,
        // the previous contacts, and then the new contact coming from
        // the payload (action.payload)
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      // Return all contacts that are not the action.payload (id)
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case SET_CURRENT:
      // Set current contact
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      // Clear current value
      return {
        ...state,
        current: null,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        // This maps over all the contacts, checks for the one that is
        // the updated contact, changes that contact, returns all others.
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          // will return anything that matches the name or email
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      // Clear current value
      return {
        ...state,
        filter: null,
      };
    default:
      return state;
  }
};

import { combineReducers } from 'redux';

/* -------------------<   ACTIONS   >--------------------- */

const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const GET_ALL_CONTACTS = 'GET_ALL_CONTACTS';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addContactSync = contact => ({ type: ADD_CONTACT, contact });
export const updateContactSync = contact => ({ type: UPDATE_CONTACT, contact });
export const removeContactSync = contact => ({ type: REMOVE_CONTACT, contact });
export const getAllContactsSync = contacts => ({ type: GET_ALL_CONTACTS, contacts });

/* -------------------<   REDUCERS   >--------------------- */

let initialState = {
  contacts: [],
  // future use
  searchTerm: 'placeholder',
  results: ['hello']
};

const store = function(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return Object.assign({}, state, {contacts: [...state.contacts, action.contact]});
    case UPDATE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el.id !== action.contact.id).concat(action.contact)});
    case REMOVE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el !== action.contact)});
    case GET_ALL_CONTACTS:
      console.log("allContacts from store", action.contacts)
      return Object.assign({}, state, {contacts: action.contacts});

    default:
      return state;
  }
};

/* ---------------<   THUNK DISPATCHERS   >---------------- */
import { createContact, getContact, editContact, getAllContacts } from './realm';

export const addContact = (contact) => dispatch => {
  createContact(contact); // create new contact in realm
  let allContacts = Array.prototype.slice.call(getAllContacts());
  dispatch(getAllContactsSync(allContacts)); // update store with new contact
};

export const updateContact = (contact) => dispatch => {
  editContact(contact);
  let editedContact = Array.prototype.slice.call(getContact(contact.id))
  console.log(editedContact, "num contacts", getAllContacts().length)
  dispatch(updateContactSync(editedContact));
};

export default combineReducers({ store });

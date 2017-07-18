import { combineReducers } from 'redux';

/* -------------------<   ACTIONS   >--------------------- */

const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const REMOVE_ALL_CONTACTS = 'REMOVE_ALL_CONTACTS';
const GET_ALL_CONTACTS = 'GET_ALL_CONTACTS';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addContactSync = contact => ({ type: ADD_CONTACT, contact });
export const updateContactSync = contact => ({ type: UPDATE_CONTACT, contact });
export const removeContactSync = id => ({ type: REMOVE_CONTACT, id });
export const removeAllContactsSync = () => ({ type: REMOVE_CONTACT });
export const getAllContactsSync = contacts => ({ type: GET_ALL_CONTACTS, contacts });

/* -------------------<   REDUCERS   >--------------------- */

let initialState = {
  contacts: [],
};

const store = function(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return Object.assign({}, state, {contacts: [...state.contacts, action.contact]});
    case UPDATE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el.id !== action.contact.id).concat(action.contact)});
    case REMOVE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el.id !== action.id)});
    case GET_ALL_CONTACTS:
      console.log("allContacts from store", action.contacts)
      return Object.assign({}, state, {contacts: action.contacts});
    case REMOVE_ALL_CONTACTS:
        return Object.assign({}, state, {contacts: []});

    default:
      return state;
  }
};

/* ---------------<   THUNK DISPATCHERS   >---------------- */
import { createContact, getContact, deleteContact, deleteAllContacts, editContact, getAllContacts } from './realm';

export const addContact = (contact) => dispatch => {
  createContact(contact); // create new contact in realm
  let allContacts = Array.prototype.slice.call(getAllContacts());
  dispatch(getAllContactsSync(allContacts)); // update store with new contact
};

export const updateContact = (contact) => dispatch => {
  editContact(contact);
  let editedContact = Array.prototype.slice.call(getContact(contact.id))[0];
  dispatch(updateContactSync(editedContact));
};

export const removeContact = (contactID) => dispatch => {
  dispatch(removeContactSync(contactID));
  deleteContact(contactID);
};

export const removeAllContacts = () => dispatch => {
  dispatch(removeAllContactsSync());
  deleteAllContacts();
};

export default combineReducers({ store });

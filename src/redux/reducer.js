import { combineReducers } from 'redux';

/* -------------------<   ACTIONS   >--------------------- */

const POPULATE_CONTACTS = 'POPULATE_CONTACTS';
const ADD_CONTACT = 'ADD_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';

/* ---------------<   ACTION CREATORS   >------------------- */

export const populateContactsSync = contacts => ({ type: POPULATE_CONTACTS, contacts });
export const addContactSync = contact => ({ type: ADD_CONTACT, contact });
export const removeContactSync = contact => ({ type: REMOVE_CONTACT, contact });

/* -------------------<   REDUCERS   >--------------------- */

let initialState = {
  contacts: [
    {
      name: 'Bill',
      frequency: 'Daily',
      lastContact: '04/26/17',
    }, {
      name: 'Margaret',
      frequency: 'Bi-weekly',
      lastContact: '04/20/17',
    }, {
      name: 'Jack',
      frequency: 'Weekly',
      lastContact: '04/29/17',
    }, {
      name: 'Jane',
      frequency: 'Monthly',
      lastContact: '04/28/17',
    },
 ]
};

const store = function(state = initialState, action) {
  console.log(state.contacts)
  switch (action.type) {
    case POPULATE_CONTACTS:
      return Object.assign({}, state, {contacts: action.contacts});
    case ADD_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.concat(action.contact)});
    case REMOVE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el !== action.contact)});
    default:
      return state;
  }
};

/* -------------------<   COMBINING  >--------------------- */

export default combineReducers({ store });


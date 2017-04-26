import { combineReducers } from 'redux';

/* -------------------<   ACTIONS   >--------------------- */

const POPULATE_CONTACTS = 'POPULATE_CONTACTS';
const ADD_CONTACT = 'ADD_CONTACT';

/* ---------------<   ACTION CREATORS   >------------------- */

export const populateContactsSync = contacts => ({ type: POPULATE_CONTACTS, contacts });
export const addContactSync = contact => ({ type: ADD_CONTACT, contact });

/* -------------------<   REDUCERS   >--------------------- */

let initialState = {
  contacts: [{Bill: 'Daily'}, {Margaret: 'Bi-weekly'}, {Jack: 'Weekly'}]
};

const store = function(state = initialState, action) {
  console.log(state.contacts)
  switch (action.type) {
    case POPULATE_CONTACTS:
      return Object.assign({}, state, {contacts: action.contacts});
    case ADD_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.concat(action.contact)});
    default:
      return state;
  }
};

/* -------------------<   COMBINING  >--------------------- */

export default combineReducers({ store });


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

import moment from 'moment';

// create sample dates for seeding
let lc1 = parseInt(moment().subtract(1, 'day').format('x'), 10);
let lc2 = parseInt(moment().subtract(4, 'day').format('x'), 10);
let lc3 = parseInt(moment().subtract(7, 'day').format('x'), 10);
let lc4 = parseInt(moment().subtract(14, 'day').format('x'), 10);
let lc5 = parseInt(moment().subtract(25, 'day').format('x'), 10);

let nc1 = parseInt(moment().format('x'), 10);
let nc2 = parseInt(moment().add(1, 'day').format('x'), 10);
let nc3 = parseInt(moment().add(3, 'day').format('x'), 10);
let nc4 = parseInt(moment().add(8, 'day').format('x'), 10);

let initialState = {
  contacts: [
    {
      firstName: 'Katie',
      lastName: 'Smith',
      frequency: 7,
      lastContact: lc4,
      nextContact: nc1,
      lastMsg: 'We talked about dinosaurs',
      phoneNum: '1-000-351-2504',
      color: 'purple',
    }, {
      firstName: 'Ivan',
      lastName: 'Anderson',
      frequency: 1,
      lastContact: lc1,
      nextContact: nc1,
      lastMsg: 'Planning wedding',
      phoneNum: '773-242-0926',
      color: 'forestgreen',
    }, {
      firstName: 'Tyler',
      lastName: 'Miller',
      frequency: 4,
      lastContact: lc2,
      nextContact: nc2,
      lastMsg: 'Started rock climbing',
      phoneNum: '347-371-3850',
      color: '#73d4e3',
    }, {
      firstName: 'Sophie',
      lastName: 'Lee',
      frequency: 30,
      lastContact: lc5,
      nextContact: nc3,
      lastMsg: 'Birthday on May 7',
      phoneNum: '1-000-351-2504',
      color: 'forestgreen',
    },
    {
      firstName: 'Alex',
      lastName: 'Garcia',
      frequency: 14,
      lastContact: lc3,
      nextContact: nc3,
      lastMsg: 'Went hiking together',
      phoneNum: '1-000-351-2504',
      color: 'purple',
    },
    {
      firstName: 'Sofia',
      lastName: 'Rhodes',
      frequency: 14,
      lastContact: lc4,
      nextContact: nc4,
      lastMsg: 'Wants to go to UNIQLO',
      phoneNum: '1-000-351-2504',
      color: '#73d4e3',
    },
 ],
  searchTerm: 'placeholder',
  results: ['hello']
};

const store = function(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case ADD_CONTACT:
      return Object.assign({}, state, {contacts: [...state.contacts, action.contact]});
    case UPDATE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el.firstName !== action.contact.firstName).concat(action.contact)});
    case REMOVE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el !== action.contact)});
    case GET_ALL_CONTACTS:
      return Object.assign({}, state, {contacts: action.contacts});

    default:
      return state;
  }
};

/* ---------------<   THUNK DISPATCHERS   >---------------- */

// export const getToday = () => dispatch => {
//   const contacts = state.contacts.filter(el => el.nextContact === 'today')
//   console.log(contacts)
//   dispatch(getTodaySync(contacts));
// };

export default combineReducers({ store });

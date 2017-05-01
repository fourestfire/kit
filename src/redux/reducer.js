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
  contacts: [
    {
      firstName: 'Katie',
      lastName: 'Smith',
      frequency: 7,
      lastContact: 1493190000000,
      nextContact: 1493597308000,
      lastMsg: 'We talked about dinosaurs',
      phoneNum: '1-324-351-2504',
      color: 'purple',
    }, {
      firstName: 'Ivan',
      lastName: 'Anderson',
      frequency: 1,
      lastContact: 1492671600000,
      nextContact: 1493597308000,
      lastMsg: 'Planning wedding',
      phoneNum: '1-212-351-2504',
      color: 'forestgreen',
    }, {
      firstName: 'Tyler',
      lastName: 'Miller',
      frequency: 3,
      lastContact: 1493449200000,
      nextContact: 1493684280547,
      lastMsg: 'Started rock climbing',
      phoneNum: '1-908-351-2504',
      color: '#73d4e3',
    }, {
      firstName: 'Sophie',
      lastName: 'Lee',
      frequency: 30,
      lastContact: 1493362800000,
      nextContact: 1493684280547,
      lastMsg: 'Birthday on May 7',
      phoneNum: '1-718-351-2504',
      color: 'forestgreen',
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

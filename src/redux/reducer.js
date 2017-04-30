import { combineReducers } from 'redux';

/* -------------------<   ACTIONS   >--------------------- */

const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';

const GET_ALL_CONTACTS = 'GET_ALL_CONTACTS';
const GET_TODAY = 'GET_TODAY';
const GET_TOMORROW = 'GET_TOMORROW';

/* ---------------<   ACTION CREATORS   >------------------- */

export const addContactSync = contact => ({ type: ADD_CONTACT, contact });
export const updateContactSync = contact => ({ type: UPDATE_CONTACT, contact });
export const removeContactSync = contact => ({ type: REMOVE_CONTACT, contact });

export const getTodaySync = contacts => ({ type: GET_TODAY, contacts });
export const getTomorrowSync = contacts => ({ type: GET_TOMORROW, contacts });
export const getAllContactsSync = contacts => ({ type: GET_ALL_CONTACTS, contacts });

/* -------------------<   REDUCERS   >--------------------- */

let initialState = {
  contacts: [
    {
      name: 'Bill',
      frequency: 'Daily',
      lastContact: '04/26/17',
      nextContact: 'today', // need to fix
      lastMsg: 'We talked about dinosaurs',
      phoneNum: '1-324-351-2504',
      color: 'purple',
    }, {
      name: 'Margaret',
      frequency: 'Bi-weekly',
      lastContact: '04/20/17',
      nextContact: 'today',
      lastMsg: 'Planning wedding',
      phoneNum: '1-212-351-2504',
      color: '#73d4e3',
    }, {
      name: 'Jack',
      frequency: 'Weekly',
      lastContact: '04/29/17',
      nextContact: 'tomorrow',
      lastMsg: 'Started rock climbing',
      phoneNum: '1-908-351-2504',
      color: 'forestgreen',
    }, {
      name: 'Jane',
      frequency: 'Monthly',
      lastContact: '04/28/17',
      nextContact: 'tomorrow',
      lastMsg: 'Birthday next Tuesday',
      phoneNum: '1-718-351-2504',
      color: 'darkgreen',
    },
 ],
  today: [],
  tomorrow: [],
  searchTerm: 'placeholder',
  results: ['hello']
};

const store = function(state = initialState, action) {
  switch (action.type) {

    case ADD_CONTACT:
      return Object.assign({}, state, {contacts: [...state.contacts, action.contact]});
    case UPDATE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el.name !== action.contact.name).concat(action.contact)});
    case REMOVE_CONTACT:
      return Object.assign({}, state, {contacts: state.contacts.filter(el => el !== action.contact)});

    case GET_ALL_CONTACTS:
      return Object.assign({}, state, {contacts: action.contacts});
    case GET_TODAY:
      return Object.assign({}, state, {today: action.contacts});
    case GET_TOMORROW:
      return Object.assign({}, state, {tomorrow: action.contacts});

    default:
      return state;
  }
};

/* ---------------<   THUNK DISPATCHERS   >---------------- */

// export const getToday = () => dispatch => {
//   const contacts = this.props.store.contacts.filter(el => el.nextContact === 'today')
//   console.log(contacts)
//   dispatch(getTodaySync(contacts));
// };

export default combineReducers({ store });

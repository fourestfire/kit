import Realm from 'realm';
import uuid from 'uuid';
import moment from 'moment';
import { Dimensions } from 'react-native';
import Mixpanel from 'react-native-mixpanel';

class Settings {
  static get () { return realm.objects(Settings.schema.name) }
  static schema = {
    name: 'Settings',
    properties: {
      deviceID: {type: 'string', default: 'init'},
      created: {type: 'string', default: Date()},
      lastOpen: {type: 'string', default: 'init'},
      lastOpenedToday: {type: 'bool', default: false},
      finishedToday: {type: 'bool', default: false},
      contactsImported: {type: 'bool', default: false},
      tutorialSeen: {type: 'bool', default: false},
      color1: {type: 'string', default: 'purple'},
      color2: {type: 'string', default: '#73d4e3'},
      color3: {type: 'string', default: 'forestgreen'},
      textMessage: {type: 'string', default: "Hey!"},
      deviceSize: {type: 'string', default: 'regular'},
    }
  }
}

export const createInitialSettings = () => {
  let {width} = Dimensions.get('window');
  let deviceSize;
  if (width <= 320) deviceSize = 'small';
  else deviceSize = 'regular';

  realm.write(() => {
    realm.create(Settings.schema.name, {
      deviceSize: deviceSize
    });
  });
};

export const initializeSettingsIfNeeded = () => {
  if (Settings.get().length === 0) {
    createInitialSettings();
    Mixpanel.identify(getSettings().deviceID); // identify user in mixpanel
    Mixpanel.set({
      "$created": getSettings().created,
      "$last_login": getSettings().lastOpen,
    });
  } else {
    // console.log('current settings', getSettings());
  }
}

export const getSettings = () => {
  return Settings.get()[0];
}

export const changeMessageInSettings = (newMessage) => {
  realm.write(() => {
    try {
      getSettings().textMessage = newMessage;
    } catch (e) {
      console.warn(e)
    }
  });
}

export const setFinishedToday = (bool) => {
  realm.write(() => {
    try {
      getSettings().finishedToday = !!bool;
    } catch (e) {
      console.warn(e)
    }
  });
}

export const setLastLogin = () => {
  realm.write(() => {
    try {
      if (getSettings().lastOpen !== 'init' && moment(getSettings().lastOpen).isSameOrBefore(moment(),'day')) {
        getSettings().lastOpenedToday = true; // check if app was last opened today
      }
      getSettings().lastOpen = Date(); // set lastOpen to current datetime

      // sync login with mixPanel
      Mixpanel.set({
        "$last_login": getSettings().lastOpen,
      });

      Mixpanel.increment("Login Count", 1)

    } catch (e) {
      console.warn(e)
    }
  });
}

export const markContactsImportedTrue = () => {
  realm.write(() => {
    try {
      getSettings().contactsImported = true;
    } catch (e) {
      console.warn(e)
    }
  });
}

export const markTutorialSeenTrue = () => {
  realm.write(() => {
    try {
      getSettings().tutorialSeen = true;
    } catch (e) {
      console.warn(e)
    }
  });
}

class Contact {
  static get () { return realm.objects(Contact.schema.name) }
  static schema = {
    name: 'Contact',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      firstName:  'string',
      lastName: 'string',
      fullName: 'string',
      frequency: {type: 'int', default: 14},
      nextContact: 'int',
      lastContact: 'int',
      lastMsg: 'string',
      phoneNum: 'string',
      color: 'string',
      notes: 'string',
      contactHistory: {type: 'list', objectType: 'ContactHistory'},
    }
  }
}

class ContactHistory {
  static schema = {
    name: 'ContactHistory',
    properties: {
      date:  'string',
      message: 'string',
    }
  }
}

export const getContact = (id) => {
  return Contact.get().filtered(`id = '${id}'`)
};

export const getAllContacts = () => {
  return Contact.get();
};

export const editContact = (contact) => {
  let contactHistory = getContact(contact.id)[0].contactHistory
  let date = moment(contact.lastContact).format('L')

  realm.write(() => {
    try {
      if (!contact.lastMsg) {  // used for update contact modal, which updates core contact information
        realm.create('Contact', {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          fullName: `${contact.firstName} ${contact.lastName}`,
          frequency: contact.frequency,
          nextContact: contact.nextContact,
          phoneNum: contact.phoneNum,
          color: contact.color,
          notes: contact.notes,
        }, true); // true updates contact instead of creating new one
      } else {
         realm.create('Contact', { // used for complete modal, which only updates the contact dates and message
          id: contact.id,
          nextContact: contact.nextContact,
          lastContact: contact.lastContact,
          lastMsg: contact.lastMsg,
        }, true);

        contactHistory.push({ date: date, message: contact.lastMsg }) // adds to data history array for contact
      }
    } catch (e) {
      console.warn(e)
    }
  });
}

export const createContact = contact => {
  // console.log('creating new contact', contact);
  realm.write(() => {
    realm.create(Contact.schema.name, {
      id: uuid.v1(),
      firstName:  contact.firstName || 'Placeholder',
      lastName: contact.lastName || 'Placeholder',
      fullName: `${contact.firstName} ${contact.lastName}` || 'Full Name',
      frequency: contact.frequency || 14,
      nextContact: contact.nextContact || parseInt(moment().format('x'), 10),
      lastContact: contact.lastContact || 0,
      lastMsg: contact.lastMsg || 'N/A',
      notes: contact.notes || '',
      phoneNum: contact.phoneNum || '123-123-1234',
      color: contact.color || 'None',
    });
  });
  // console.log('total # of contacts', getAllContacts().length);
  // getAllContacts().forEach((contact, idx) => console.log(`contact ${idx + 1}: ${contact.firstName} ${contact.lastName} ${contact.phoneNum} ${contact.nextContact} ${contact.lastContact}`));
};

export const deleteContact = id => {
  realm.write(() => {
    realm.delete(getContact(id));
  });
};

export const deleteAllContacts = () => {
  realm.write(() => {
    let contacts = realm.objects('Contact');
    realm.delete(contacts);
  });
};

const realm = new Realm({
  schema: [Contact, ContactHistory, Settings]
});

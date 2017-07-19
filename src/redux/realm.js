import Realm from 'realm';
import uuid from 'uuid';
import moment from 'moment';

class Settings {
  static get () { return realm.objects(Settings.schema.name) }
  static schema = {
    name: 'Settings',
    properties: {
      firstTime: {type: 'bool', default: true},
      color1: {type: 'string', default: 'purple'},
      color2: {type: 'string', default: '#73d4e3'},
      color3: {type: 'string', default: 'forestgreen'},
      textMessage: {type: 'string', default: "Hey! Haven't talked to you in a while. What's up?"},
    }
  }
}

export const createInitialSettings = () => {
  realm.write(() => {
    realm.create(Settings.schema.name, {});
  });
};

export const initializeSettingsIfNeeded = () => {
  if (Settings.get().length === 0) {
    createInitialSettings();
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

export const markFirstTimeAsFalse = () => {
  realm.write(() => {
    try {
      getSettings().firstTime = false;
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
      frequency: {type: 'int', default: 14},
      nextContact: 'int',
      lastContact: 'int',
      lastMsg: 'string',
      phoneNum: 'string',
      color: 'string',
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
          frequency: contact.frequency,
          phoneNum: contact.phoneNum,
          color: contact.color,
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
      frequency: contact.frequency || 14,
      nextContact: contact.nextContact || parseInt(moment().format('x'), 10),
      lastContact: contact.lastContact || 0,
      lastMsg: contact.lastMsg || 'N/A',
      phoneNum: contact.phoneNum || '123-123-1234',
      color: contact.color || 'Group 1',
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

import Realm from 'realm';
import uuid from 'uuid';
import moment from 'moment';
import { Dimensions } from 'react-native';
import Mixpanel from 'react-native-mixpanel';
import DeviceInfo from 'react-native-device-info';

class Settings {
  static get () { return realm.objects(Settings.schema.name) }
  static schema = {
    name: 'Settings',
    properties: {
      deviceID: {type: 'string', default: DeviceInfo.getUniqueID()},
      created: {type: 'string', default: moment().format()},
      lastOpen: {type: 'string', default: 'init'},
      lastOpenedToday: {type: 'bool', default: false},
      finishedToday: {type: 'bool', default: false},
      contactsImported: {type: 'bool', default: false},
      tutorialSeen: {type: 'bool', default: false},
      color1: {type: 'string', default: 'purple'},
      color2: {type: 'string', default: '#73d4e3'},
      color3: {type: 'string', default: 'forestgreen'},
      group1: {type: 'string', default: 'Group 1'},
      group2: {type: 'string', default: 'Group 2'},
      group3: {type: 'string', default: 'Group 3'},
      textMessage: {type: 'string', default: "Hey!"},
      deviceSize: {type: 'string', default: 'regular'},
      totalCompletes: {type: 'int', default: 0},
      overallStreak: {type: 'int', default: 0},
      // name: {type: 'string', default: ''},
      // email: {type: 'string', default: ''},
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
      "Device Name": DeviceInfo.getDeviceName(),
      "Device Type": DeviceInfo.getModel()
    });

    // console.log(DeviceInfo.getDeviceLocale()); // en
    // console.log(DeviceInfo.getSystemVersion()); // 11.2
    // console.log(DeviceInfo.getTimezone()); // America/New_York

  } else {
    // console.log('current settings', getSettings());
  }
}

export const getSettings = () => {
  return Settings.get()[0];
}

export const trackCompletes = (id) => {
  // console.log('total completes:', getSettings().totalCompletes + 1)
  // console.log('total for this contact', getContact(id)[0].numTimesContacted)
  realm.write(() => {
    try {
      getSettings().totalCompletes += 1;
    } catch (e) {
      console.warn(e)
    }
  });
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
      getSettings().finishedToday = bool;
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
      getSettings().lastOpen = moment().format(); // set lastOpen to current datetime

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
      birthday: 'int',
      numTimesContacted: {type: 'int', default: 0},
      currentStreak: {type: 'int', default: 0},
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
  let contactHistory = getContact(contact.id)[0].contactHistory;
  let dateForHistory = moment(contact.lastContact).format('L');

  realm.write(() => {
    try {
      if (!contact.lastMsg) {  // used for update contact modal, which updates core contact information
        realm.create('Contact', {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          fullName: contact.fullName,
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
          numTimesContacted: contact.numTimesContacted + 1
        }, true);

        contactHistory.push({ date: dateForHistory, message: contact.lastMsg }) // adds to data history array for contact
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
      firstName:  contact.firstName || '',
      lastName: contact.lastName || '',
      fullName: contact.fullName || '',
      frequency: contact.frequency || 14,
      nextContact: contact.nextContact || parseInt(moment().format('x'), 10),
      lastContact: contact.lastContact || 0,
      lastMsg: contact.lastMsg || 'N/A',
      notes: contact.notes || '',
      phoneNum: contact.phoneNum || '123-123-1234',
      color: contact.color || 'None',
      birthday: contact.birthday || 0, // int to store as a moment 'x' date
      numTimesContacted: 0,
      currentStreak: 0
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

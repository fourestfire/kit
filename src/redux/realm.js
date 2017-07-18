import Realm from 'realm';
import uuid from 'uuid';
import moment from 'moment';

class Settings {
  static get () { return realm.objects(Settings.schema.name) }
  static schema = {
    name: 'Settings',
    properties: {
      appFirstOpen: 'boolean',
      firstName:  'string',
      lastName: 'string',
      frequency: {type: 'int', default: 14},
      nextContact: 'int',
      lastContact: {type: 'int', default: 0},
      lastMsg: 'string',
      phoneNum: 'string',
      color: 'string'
    }
  }
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
      color: 'string'
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
  realm.write(() => {
    try {
      if (!contact.lastMsg) {
        realm.create('Contact', {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          frequency: contact.frequency,

          phoneNum: contact.phoneNum,
          color: contact.color,
        }, true); // true updates contact instead of creating new one
      } else {
         realm.create('Contact', {
          id: contact.id,
          nextContact: contact.nextContact,
          lastContact: contact.lastContact,
          lastMsg: contact.lastMsg,
        }, true); // true updates contact instead of creating new one
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
      color: contact.color || 'None'
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
  schema: [Contact]
});

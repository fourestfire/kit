import Realm from 'realm';
import uuid from 'uuid';
// import { ListView } from 'realm/react-native'

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
      lastContact: {type: 'int', default: 0},
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

// export const getContact = (id) => {
//   return realm.objectForPrimaryKey(Contact, id)
// }

export const editContact = (contact) => {
  realm.write(() => {
    try {
      realm.create('Contact', {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        frequency: contact.frequency,
        color: contact.color,
      }, true); // true updates contact instead of creating new one
    } catch (e) {
      console.warn(e)
    }
  });
}

export const createContact = contact => {
  console.log('creating new contact', contact);
  realm.write(() => {
    realm.create(Contact.schema.name, {
      id: uuid.v1(),
      firstName:  contact.firstName || 'itsme',
      lastName: contact.lastName || 'shiba',
      frequency: contact.frequency || 14,
      nextContact: contact.nextContact,
      lastContact: contact.lastContact || 0,
      lastMsg: contact.lastMsg,
      phoneNum: contact.phoneNum || '123-123-1234',
      color: contact.color
    });
  });
  console.log('total # of contacts', getAllContacts().length);
  // getAllContacts().forEach((contact, idx) => console.log(`contact ${idx + 1}: ${contact.firstName} ${contact.lastName} ${contact.phoneNum} ${contact.nextContact} ${contact.lastContact}`));
};

export const deleteContact = (Contact) => {
  realm.write(() => {
    realm.delete(Contact);
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

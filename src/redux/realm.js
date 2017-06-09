import Realm from 'realm';
import uuid from 'uuid';
// import { ListView } from 'realm/react-native'

class Contact {
  static get () { return realm.objects(Contact.schema.name) }
  static schema = {
    name: 'Contact',
    primaryKey: 'id',
    properties: {
      id: 'string',
      firstName:  'string',
      lastName: 'string',
      miles: {type: 'int', default: 0},
    }
  }
}

export const getContacts = () => {
  return Contact.get()
}

// export const getContact = (id) => {
//   return realm.objectForPrimaryKey(Contact, id)
// }

// export const updateTodoItem = (todoItem, value, completed) => {
//   realm.write(() => {
//     try {
//       todoItem.value = value
//       todoItem.completed = completed
//     } catch (e) {
//       console.warn(e)
//     }
//   })
// }

export const createContact = (value) => {
  console.log('creating new contact')
  console.log(uuid.v1(), typeof(uuid.v1()))
  realm.write(() => {
    realm.create(Contact.schema.name, {
      id: uuid.v1(),
      firstName:  'itsme',
      lastName: 'shiba',
      miles: 1750,
    })
  })
  console.log('# of contacts', getContacts().length)
}

export const deleteContact = (Contact) => {
  realm.write(() => {
    realm.delete(Contact)
  })
}

export const deleteAllContacts = () => {
  realm.write(() => {
    let contacts = realm.objects('Contact')
    realm.delete(contacts)
  })
}

const realm = new Realm({schema: [Contact]})

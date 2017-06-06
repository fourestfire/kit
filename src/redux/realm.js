import Realm from 'realm'
// import { ListView } from 'realm/react-native'
// const uuid = require('uuid')

class Car {
  static get () { return realm.objects(Car.schema.name) }
  static schema = {
    name: 'Car',
    properties: {
      make:  'string',
      model: 'string',
      miles: {type: 'int', default: 0},
    }
  }
}

// export const todoItemDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

export const getCars = () => {
  const cars = Car.get()
  return cars
}

// export const getTodoItem = (id) => {
//   const todoItem = realm.objectForPrimaryKey(TodoItem, id)
//   return todoItem
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

// export const createTodoItem = (value) => {
//   realm.write(() => {
//     realm.create(TodoItem.schema.name, {
//       id: uuid.v1(),
//       value,
//       createdTimestamp: new Date()
//     })
//   })
// }

// export const deleteTodoItem = (todoItem) => {
//   realm.write(() => {
//     realm.delete(todoItem)
//   })
// }

const realm = new Realm({schema: [Car]})

realm.write(() => {
  let car = realm.create('Car', {
    make: 'Honda',
    model: 'Civic',
    miles: 750,
  });

  // you can access and set all properties defined in your model
  console.log('Car type is ' + car.make + ' ' + car.model);
  car.miles = 1500;
});

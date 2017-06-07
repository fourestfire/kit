import Realm from 'realm';
import uuid from 'uuid';
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

export const getSomeCars = () => {
  const cars = Car.get()
  return cars.slice(10, cars.length - 1);
}


export const getCar = (id) => {
  const car = realm.objectForPrimaryKey(Car, id)
  return car
}

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

export const createTodoItem = (value) => {
  console.log('creating new car')
  realm.write(() => {
    realm.create(Car.schema.name, {
      make: 'Another Honda',
      model: 'Civic',
      miles: 1750,
    })
  })
  console.log('# of cars', getCars().length)
}

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

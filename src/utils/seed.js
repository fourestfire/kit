import moment from 'moment';

// create sample dates for seeding
let lc1 = parseInt(moment().subtract(1, 'day').format('x'), 10);
let lc2 = parseInt(moment().subtract(4, 'day').format('x'), 10);
let lc3 = parseInt(moment().subtract(7, 'day').format('x'), 10);
let lc4 = parseInt(moment().subtract(14, 'day').format('x'), 10);
let lc5 = parseInt(moment().subtract(25, 'day').format('x'), 10);

let nc1 = parseInt(moment().format('x'), 10);
let nc2 = parseInt(moment().add(1, 'day').format('x'), 10);
let nc3 = parseInt(moment().add(3, 'day').format('x'), 10);
let nc4 = parseInt(moment().add(8, 'day').format('x'), 10);

const sampleContacts = [
    {
      firstName: 'Katie',
      lastName: 'Smith',
      frequency: 7,
      lastContact: lc4,
      nextContact: nc1,
      lastMsg: 'We talked about dinosaurs',
      phoneNum: '1-000-351-2504',
      color: 'purple',
    }, {
      firstName: 'Ivan',
      lastName: 'Anderson',
      frequency: 1,
      lastContact: lc1,
      nextContact: nc1,
      lastMsg: 'Planning wedding',
      phoneNum: '773-242-0926',
      color: 'forestgreen',
    }, {
      firstName: 'Tyler',
      lastName: 'Miller',
      frequency: 4,
      lastContact: lc2,
      nextContact: nc2,
      lastMsg: 'Started rock climbing',
      phoneNum: '347-371-3850',
      color: '#73d4e3',
    }, {
      firstName: 'Sophie',
      lastName: 'Lee',
      frequency: 30,
      lastContact: lc5,
      nextContact: nc3,
      lastMsg: 'Birthday on May 7',
      phoneNum: '1-000-351-2504',
      color: 'forestgreen',
    },
    {
      firstName: 'Alex',
      lastName: 'Garcia',
      frequency: 14,
      lastContact: lc3,
      nextContact: nc3,
      lastMsg: 'Went hiking together',
      phoneNum: '1-000-351-2504',
      color: 'purple',
    },
    {
      firstName: 'Sofia',
      lastName: 'Rhodes',
      frequency: 14,
      lastContact: lc4,
      nextContact: nc4,
      lastMsg: 'Wants to go to UNIQLO',
      phoneNum: '1-000-351-2504',
      color: '#73d4e3',
    },
 ];

export default sampleContacts;

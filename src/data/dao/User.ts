export interface User {
  id: string;
  full_name: string;
  age: number;
  dateOfBirth: string | null;
  address: string;
}

export const mockUser: User = {
  id: '007',
  full_name: 'Hafiz Danish Zubair',
  age: 31,
  dateOfBirth: '19/03/1992',
  address: '47 street abu dhabi',
};

export const mockUsersList: User[] = [
  {
    id: '1',
    full_name: 'John Doe',
    age: 28,
    dateOfBirth: '1994-03-15',
    address: '123 Main Street, Cityville',
  },
  {
    id: '2',
    full_name: 'Jane Smith',
    age: 22,
    dateOfBirth: '2000-08-22',
    address: '456 Oak Avenue, Townsville',
  },
  {
    id: '3',
    full_name: 'Bob Johnson',
    age: 35,
    dateOfBirth: '1987-11-10',
    address: '789 Pine Road, Villagetown',
  },
  {
    id: '4',
    full_name: 'Alice Williams',
    age: 30,
    dateOfBirth: '1992-05-18',
    address: '987 Birch Lane, Hamlet City',
  },
  {
    id: '5',
    full_name: 'Charlie Brown',
    age: 25,
    dateOfBirth: '1997-09-03',
    address: '654 Elm Street, Riverside',
  },
  {
    id: '6',
    full_name: 'Eva Davis',
    age: 32,
    dateOfBirth: '1989-12-27',
    address: '321 Cedar Avenue, Suburbia',
  },
  {
    id: '7',
    full_name: 'Frank Miller',
    age: 40,
    dateOfBirth: '1982-02-08',
    address: '555 Maple Court, Uptown',
  },
  {
    id: '8',
    full_name: 'Grace Turner',
    age: 29,
    dateOfBirth: '1993-06-14',
    address: '888 Willow Lane, Downtown',
  },
  {
    id: '9',
    full_name: 'Henry Taylor',
    age: 26,
    dateOfBirth: '1996-04-30',
    address: '222 Redwood Drive, Metro City',
  },
  {
    id: '10',
    full_name: 'Isabel Garcia',
    age: 33,
    dateOfBirth: '1988-08-12',
    address: '444 Pineapple Street, Seaside',
  },
];

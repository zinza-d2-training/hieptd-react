import { User, Role } from 'utils/types';

export const USERS: User[] = [
   {
      id: 1,
      username: 'admin',
      password: '123456',
      firstName: 'Duy',
      lastName: 'Hiệp',
      email: 'hellozinza@gmail.com',
      dateOfBirth: '01/01/1993',
      role: Role.Admin,
      active: true,
   },
   {
      id: 2,
      username: 'projectmanager',
      password: '123456',
      firstName: 'Văn',
      lastName: 'Hiệp',
      email: 'hellozinza@gmail.com',
      dateOfBirth: '07/09/2021',
      role: Role.PM,
      active: true,
   },
   {
      id: 3,
      username: 'member',
      password: '123456',
      firstName: 'Duy',
      lastName: 'Hà',
      email: 'hellozinza@gmail.com',
      dateOfBirth: '16/09/2021',
      role: Role.Member,
      active: true,
   },
   {
      id: 4,
      username: 'member',
      password: '123456',
      firstName: 'Hoa',
      lastName: 'Hậu',
      email: 'hellozinza@gmail.com',
      dateOfBirth: '16/09/2021',
      role: Role.Member,
      active: false,
   },
   {
      id: 4,
      username: 'member',
      password: '123456',
      firstName: 'Văn',
      lastName: 'Hiếu',
      email: 'hellozinza@gmail.com',
      dateOfBirth: '16/09/2021',
      role: Role.Member,
      active: false,
   },
   {
      id: 4,
      username: 'member',
      password: '123456',
      firstName: 'Hoàng',
      lastName: 'Dũng',
      email: 'hellozinza@gmail.com',
      dateOfBirth: '17/09/2021',
      role: Role.Member,
      active: false,
   },
   {
      id: 4,
      username: 'member',
      password: '123456',
      firstName: 'Học',
      lastName: 'Vẹt',
      email: 'hellozinza@gmail.com',
      dateOfBirth: '12/09/2021',
      role: Role.Member,
      active: false,
   },
];

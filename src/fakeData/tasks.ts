import { Task, TaskStatus, Priority, Role } from 'utils/types';

export const TASKS: Task[] = [
   {
      id: 1,
      requestByUser: {
         id: 5,
         username: 'projectmanager3',
         password: '123456',
         firstName: 'Bùi',
         lastName: 'Hoàng',
         email: 'hellozinza5@gmail.com',
         dateOfBirth: '1999-01-25',
         role: Role.PM,
         active: false,
      },
      assign: {
         id: 7,
         username: 'projectmanager5',
         password: '123456',
         firstName: 'Đinh',
         lastName: 'Nam',
         email: 'hellozinza7@gmail.com',
         dateOfBirth: '1999-01-25',
         role: Role.PM,
         active: true,
      },
      projectId: 2,
      title: 'Task 2',
      notes: 'Task 2 of project 2 note',
      dueDate: '2021-10-09',
      status: TaskStatus.Unscheduled,
      priority: Priority.Medium,
   },
];

export interface LoginData {
   username: string;
   password: string;
}

export enum Role {
   Admin = 'admin',
   PM = 'pm',
   Member = 'member',
}
export type User = {
   id: number;
   username: string;
   password: string;
   email: string;
   avatar?: any;
   firstName: string;
   lastName: string;
   roles: Role;
   active: boolean;
   dateOfBirth: string;
};
export type Project = {
   id: number;
   name: string;
   status: string;
   client: string;
   description: string;
   startDate: string;
   endDate: string;
   member: User[];
   pm: User;
};
export type Task = {
   title: string;
   notes: string;
   assign: User;
   dueDate: string;
   status: string;
};
export type Report = {
   title: string;
   user: User;
   date: string;
   notes: string;
};

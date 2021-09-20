export interface LoginData {
   username: string;
   password: string;
}

export enum Role {
   Admin = 'admin',
   PM = 'pm',
   Member = 'member',
}
export enum TaskStatus {
   Requesting = 1,
   Unscheduled = 2,
   Doing = 3,
   Reviewing = 4,
   Completed = 5,
   Cancelled = 6,
}
export enum ProjectStatus {
   Requesting = 1,
   Pending = 2,
   InProgress = 3,
   Completed = 4,
   Cancelled = 5,
}
export enum Priority {
   High = 'high',
   Medium = 'medium',
}
export type User = {
   id: number;
   username: string;
   password: string;
   email: string;
   avatar?: any;
   firstName: string;
   lastName: string;
   role: Role;
   active: boolean;
   dateOfBirth: string;
};
export type Project = {
   id: number;
   name: string;
   status: ProjectStatus;
   client: string;
   description?: string;
   startDate?: string;
   endDate?: string;
   member: User[];
   pm: User;
};
export type Task = {
   id: number;
   title: string;
   notes?: string;
   assign: User;
   dueDate: string;
   status: TaskStatus;
   priority: Priority;
};
export type Report = {
   id: number;
   title: string;
   user: User;
   date: string;
   notes: string;
   note?: string;
   link: string;
};

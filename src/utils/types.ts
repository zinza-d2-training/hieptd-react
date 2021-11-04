import { AxiosResponse } from 'axios';

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
   Unscheduled = 1,
   Doing = 2,
   Reviewing = 3,
   Completed = 4,
   Cancelled = 5,
}

export enum ProjectStatus {
   Pending = 1,
   InProgress = 2,
   Completed = 3,
   Cancelled = 4,
}
export enum TaskPriority {
   High = 1,
   Medium = 2,
}
export enum UserStatus {
   inactive = 0,
   active = 1,
}
export type User = {
   id?: number;
   username: string;
   email: string;
   avatar?: any;
   firstName: string;
   lastName: string;
   role: Role;
   status: UserStatus;
   dateOfBirth?: string;
};

export type Project = {
   id: number;
   name: string;
   status: ProjectStatus;
   client: string;
   description?: string;
   startDate?: string;
   endDate?: string;
   members?: User[];
   pm?: User;
};
export type CreateProject = Partial<Project> & {
   memberIds?: number[];
   pmId?: number;
};
export type Task = {
   id: number;
   title: string;
   notes?: string;
   assignTo?: User;
   projectId: number;
   requestByUser: User;
   dueDate: string;
   status: TaskStatus;
   priority: TaskPriority;
   sequence?: number;
};
export type CreateTask = Partial<Task> & {
   assignToId?: number;
   requestById?: number;
};
export type Report = {
   id: number;
   title: string;
   user: User;
   projectId: number;
   date: string;
   note?: string;
   link?: string;
};
export type UserProfileType = User & {
   projects: Project[];
   tasks: Task[];
};

export type PaginationType = {
   total?: number;
   page: number;
   lastPage?: number;
   limit: number;
};

export interface Response<T = any> extends AxiosResponse<T> {
   message: string;
   data: T;
   error?: boolean;
   pagination?: PaginationType;
   accessToken?: string;
}
export type UserExport = User & { createdAt: string; updatedAt: string };
export type CallbackFunc = () => void;
export type PromiseFunc = () => Promise<void>;

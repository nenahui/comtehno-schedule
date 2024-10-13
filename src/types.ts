export interface Group {
  id: number;
  name: string;
}

export interface GroupMutation {
  name: string;
  course: string;
}

export interface Teacher {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
}

export interface TeacherMutation {
  name: string;
  surname: string;
  patronymic: string;
}

export interface Discipline {
  id: number;
  name: string;
}

export interface DisciplineMutation {
  name: string;
}

export interface Audience {
  id: number;
  number: string;
  floor: number;
  typeDto: {
    id: number;
    name: string;
  };
}

export interface AudienceMutation {
  number: string;
  floor: string;
  capacity: string;
  typeId: string;
}

export interface AudienceType {
  id: number;
  name: string;
}

export interface Schedule {
  id: number;
  audienceDto: Audience;
  teacherDto: Teacher;
  groupDto: Group;
  disciplineDto: Discipline;
  startDate: string;
  endDate: string;
}

export interface ScheduleMutation {
  groupId: string;
  teacherId: string;
  disciplineId: string;
  audienceId: string;
  startDate: string;
  endDate: string;
  dayOfWeek: string;
}

export interface DeleteError {
  response: {
    data: {
      status: number;
      message: string;
      timestamp: string;
    };
  };
}

export interface GlobalError {
  status: number;
  message: string;
  timestamp: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  token: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

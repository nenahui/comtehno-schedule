import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  selectAdminAudiences,
  selectAdminAudiencesFetching,
  selectAdminDisciplines,
  selectAdminDisciplinesFetching,
  selectAdminGroups,
  selectAdminGroupsFetching,
  selectAdminScheduleCreating,
  selectAdminTeachers,
  selectAdminTeachersFetching,
} from '@/features/admin/adminSlice';
import {
  createSchedule,
  fetchAudiences,
  fetchDisciplines,
  fetchGroups,
  fetchTeachers,
} from '@/features/admin/adminThunks';
import type { ScheduleMutation } from '@/types';
import React, { type FormEvent, useEffect, useState } from 'react';

export const CreateSchedule: React.FC = () => {
  const [course, setCourse] = useState<string | undefined>(undefined);
  const [scheduleMutation, setScheduleMutation] = useState<ScheduleMutation>({
    audienceId: '',
    dayOfWeek: '',
    disciplineId: '',
    endDate: '',
    groupId: '',
    startDate: '',
    teacherId: '',
  });
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectAdminGroups);
  const groupsFetching = useAppSelector(selectAdminGroupsFetching);
  const teachers = useAppSelector(selectAdminTeachers);
  const teachersFetching = useAppSelector(selectAdminTeachersFetching);
  const disciplines = useAppSelector(selectAdminDisciplines);
  const disciplinesFetching = useAppSelector(selectAdminDisciplinesFetching);
  const audiences = useAppSelector(selectAdminAudiences);
  const audiencesFetching = useAppSelector(selectAdminAudiencesFetching);
  const isCreating = useAppSelector(selectAdminScheduleCreating);

  useEffect(() => {
    if (course) {
      dispatch(fetchGroups(course));
    }
  }, [course, dispatch]);

  useEffect(() => {
    void Promise.all([dispatch(fetchTeachers()), dispatch(fetchDisciplines()), dispatch(fetchAudiences())]);
  }, [dispatch]);

  const generateTimeOptions = () => {
    const options: string[] = [];
    for (let hour = 7; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(value);
      }
    }
    return options;
  };

  const handleChange = (value: string, fieldName: string) => {
    setScheduleMutation((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    console.log(scheduleMutation);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (
      !course ||
      !scheduleMutation.groupId ||
      !scheduleMutation.teacherId ||
      !scheduleMutation.disciplineId ||
      !scheduleMutation.audienceId ||
      !scheduleMutation.dayOfWeek ||
      !scheduleMutation.startDate ||
      !scheduleMutation.endDate
    )
      return;

    dispatch(createSchedule(scheduleMutation));
  };

  const timeOptions = generateTimeOptions();

  return (
    <form onSubmit={handleSubmit}>
      <div className={'flex flex-col gap-3 mt-2'}>
        <Select value={course} onValueChange={(value) => setCourse(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Выберите курс' />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3].map((course) => (
              <SelectItem key={course} value={course.toString()}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={scheduleMutation.groupId}
          disabled={!course || groupsFetching}
          onValueChange={(v) => handleChange(v, 'groupId')}
        >
          <SelectTrigger>
            <SelectValue placeholder='Выберите Группу' />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id.toString()}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={scheduleMutation.teacherId}
          disabled={teachersFetching}
          onValueChange={(v) => handleChange(v, 'teacherId')}
        >
          <SelectTrigger>
            <SelectValue placeholder='Выберите Учителя' />
          </SelectTrigger>
          <SelectContent>
            {teachers.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id.toString()}>
                {teacher.surname} {teacher.name}.{teacher.patronymic}.
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          disabled={disciplinesFetching}
          value={scheduleMutation.disciplineId}
          onValueChange={(v) => handleChange(v, 'disciplineId')}
        >
          <SelectTrigger>
            <SelectValue placeholder='Выберите Дисциплину' />
          </SelectTrigger>
          <SelectContent>
            {disciplines.map((discipline) => (
              <SelectItem key={discipline.id} value={discipline.id.toString()}>
                {discipline.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          disabled={audiencesFetching}
          value={scheduleMutation.audienceId}
          onValueChange={(v) => handleChange(v, 'audienceId')}
        >
          <SelectTrigger>
            <SelectValue placeholder='Выберите Аудиторию' />
          </SelectTrigger>
          <SelectContent>
            {audiences.map((audience) => (
              <SelectItem key={audience.id} value={audience.id.toString()}>
                <span className={'mr-2'}>{audience.number}</span>
                <span>{audience.typeDto.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={scheduleMutation.dayOfWeek} onValueChange={(v) => handleChange(v, 'dayOfWeek')}>
          <SelectTrigger>
            <SelectValue placeholder='Выберите день занятия' />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((discipline) => (
              <SelectItem key={discipline} value={discipline.toString()}>
                {discipline === 1
                  ? 'Понедельник'
                  : discipline === 2
                    ? 'Вторник'
                    : discipline === 3
                      ? 'Среда'
                      : discipline === 4
                        ? 'Четверг'
                        : 'Пятница'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={scheduleMutation.startDate}
          onValueChange={(v) => {
            setScheduleMutation((prev) => ({
              ...prev,
              startDate: v,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Выберите время начала' />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={scheduleMutation.endDate}
          onValueChange={(v) => {
            setScheduleMutation((prev) => ({
              ...prev,
              endDate: v,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Выберите время окончания' />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type={'submit'}
          disabled={isCreating || audiencesFetching || groupsFetching || teachersFetching || disciplinesFetching}
        >
          Создать {isCreating && <Loader className={'ml-2 size-4 text-muted-foreground'} />}
        </Button>
      </div>
    </form>
  );
};

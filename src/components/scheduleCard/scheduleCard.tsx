import type { TimetableEntry } from '@/features/home/data';
import React from 'react';

interface Props {
  lesson: TimetableEntry;
}

export const ScheduleCard: React.FC<Props> = ({ lesson }) => {
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);
    return date;
  };

  const currentTime = new Date();
  const startTime = parseTime(lesson.startTime);
  const endTime = parseTime(lesson.endTime);

  const currentLesson = currentTime >= startTime && currentTime <= endTime;

  return (
    <div
      className={`bg-white p-3 ${currentLesson ? 'scale-100' : 'scale-95'}  rounded-3xl flex text-black items-center gap-2 justify-between`}
    >
      <div className={'flex gap-2 items-center h-full'}>
        <h3 className={'bg-gray-900 text-white p-3 rounded-2xl'}>{lesson.startTime}</h3>

        <div className={'flex flex-col gap-1.5'}>
          <h3 className={'leading-none line-clamp-1'}>{lesson.subject}</h3>
          <span className={'text-sm text-muted-foreground leading-none'}>{lesson.teacher}</span>
        </div>
      </div>

      <div
        className={`p-1.5 ${currentLesson ? 'bg-green-600' : 'bg-gray-900'} rounded-full mx-2 text-sm grid place-items-center text-white`}
      >
        {lesson.room}
      </div>
    </div>
  );
};

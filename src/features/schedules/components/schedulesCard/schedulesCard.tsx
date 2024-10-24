import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { selectSchedulesDeleting } from '@/features/schedules/schedulesSlice';
import { deleteSchedule } from '@/features/schedules/schedulesThunks';
import { selectUser } from '@/features/users/usersSlice';
import type { Schedule } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  schedule: Schedule;
}

export const SchedulesCard: React.FC<Props> = ({ schedule }) => {
  const user = useAppSelector(selectUser);
  const deletingSchedule = useAppSelector(selectSchedulesDeleting);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(deleteSchedule(schedule.id));
  };

  return (
    <div className={'bg-primary p-3 rounded-3xl flex items-center gap-2 justify-between'}>
      <div className={'flex gap-2 items-center h-full'}>
        <h3 className={'bg-white dark:bg-slate-900 text-black dark:text-white p-3 rounded-2xl flex flex-col'}>
          <p className={'leading-none mx-auto border-white'}>{schedule.startDate.slice(0, 5)}</p>
          <p className={'text-xs mx-auto leading-none text-center text-muted-foreground'}>
            {schedule.endDate.slice(0, 5)}
          </p>
        </h3>

        <div className={'flex flex-col gap-1.5'}>
          <h3 className={'leading-[1.15] text-white dark:text-black text-[15px] line-clamp-2'}>
            {schedule.disciplineDto.name}
          </h3>
          <span className={'text-sm text-muted leading-none'}>
            {schedule.teacherDto.surname} {schedule.teacherDto.name[0]}.{schedule.teacherDto.patronymic[0]}.
          </span>
        </div>
      </div>

      <div className={'flex items-center gap-1'}>
        <div className={'p-1.5 bg-white dark:bg-slate-800  rounded-full mx-2 text-sm grid place-items-center'}>
          {schedule.audienceDto.number}
        </div>

        {user?.token && (
          <button
            onClick={handleDelete}
            className={
              'bg-white dark:bg-slate-900 p-2.5 hover:bg-gray-800 rounded-full text-sm grid place-items-center text-white'
            }
          >
            {!deletingSchedule ? (
              <TrashIcon className={'size-4 text-primary'} />
            ) : (
              <Loader className={'size-4 text-muted-foreground'} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

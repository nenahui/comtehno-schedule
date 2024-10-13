import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { deleteSchedule } from '@/features/admin/adminThunks';
import { selectSchedulesDeleting } from '@/features/home/homeSlice';
import { selectUser } from '@/features/users/usersSlice';
import type { Schedule } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  schedule: Schedule;
}

export const ScheduleCard: React.FC<Props> = ({ schedule }) => {
  const user = useAppSelector(selectUser);
  const deletingSchedule = useAppSelector(selectSchedulesDeleting);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(deleteSchedule(schedule.id));
  };

  return (
    <div className={'bg-white p-3 scale-95 rounded-3xl flex text-black items-center gap-2 justify-between'}>
      <div className={'flex gap-2 items-center h-full'}>
        <h3 className={'bg-gray-900 text-white p-3 rounded-2xl flex flex-col'}>
          <p className={'leading-none mx-auto border-white'}>{schedule.startDate.slice(0, 5)}</p>
          <p className={'text-xs mx-auto leading-none text-center text-muted-foreground'}>
            {schedule.endDate.slice(0, 5)}
          </p>
        </h3>

        <div className={'flex flex-col gap-1.5'}>
          <h3 className={'leading-none line-clamp-1'}>{schedule.disciplineDto.name}</h3>
          <span className={'text-sm text-muted-foreground leading-none'}>
            {schedule.teacherDto.surname}.{schedule.teacherDto.name[0]}.{schedule.teacherDto.patronymic[0]}.
          </span>
        </div>
      </div>

      <div className={'flex items-center gap-1'}>
        <div className={'p-1.5 bg-gray-900 rounded-full mx-2 text-sm grid place-items-center text-white'}>
          {schedule.audienceDto.number}
        </div>

        {user?.token && (
          <button
            onClick={handleDelete}
            className={'bg-gray-900 p-2.5 hover:bg-gray-800 rounded-full text-sm grid place-items-center text-white'}
          >
            {!deletingSchedule ? (
              <TrashIcon className={'size-4'} />
            ) : (
              <Loader className={'size-4 text-muted-foreground'} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

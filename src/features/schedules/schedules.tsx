import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { selectGroups, selectGroupsFetching } from '@/features/groups/groupsSlice';
import { fetchGroups } from '@/features/groups/groupsThunks';
import { Courses } from '@/features/schedules/components/courses/courses';
import { Days } from '@/features/schedules/components/days/days';
import { GroupsList } from '@/features/schedules/components/groupsList/groupsList';
import { SchedulesCard } from '@/features/schedules/components/schedulesCard/schedulesCard';
import { selectDay, selectGroup, selectSchedules, selectSchedulesFetching } from '@/features/schedules/schedulesSlice';
import { fetchSchedules } from '@/features/schedules/schedulesThunks';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';

export const Schedules: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedDay = useAppSelector(selectDay);
  const selectedGroup = useAppSelector(selectGroup);
  const groups = useAppSelector(selectGroups);
  const groupsFetching = useAppSelector(selectGroupsFetching);
  const schedules = useAppSelector(selectSchedules);
  const schedulesFetching = useAppSelector(selectSchedulesFetching);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    if (selectedGroup) {
      dispatch(fetchSchedules());
    }
  }, [dispatch, selectedGroup]);

  if (groupsFetching) {
    return <Loader absoluteCenter className={'text-muted-foreground size-5'} />;
  }

  const currentDay =
    selectedDay === 1
      ? 'понедельник'
      : selectedDay === 2
        ? 'вторник'
        : selectedDay === 3
          ? 'среду'
          : selectedDay === 4
            ? 'четверг'
            : 'пятницу';

  return (
    <div className={'flex flex-col gap-2'}>
      <div>
        <Courses />
        <GroupsList groups={groups} fetching={groupsFetching} />
        <Days />
      </div>

      <div className='flex flex-col gap-2 relative h-full'>
        {!selectedGroup ? (
          <p
            className={
              'absolute top-1/2 left-1/2 text-nowrap mt-40 -translate-x-2/4 -translate-y-2/4 text-muted-foreground text-sm'
            }
          >
            Выберите группу.
          </p>
        ) : schedulesFetching ? (
          <Loader className={'size-5 text-muted-foreground'} absoluteCenter />
        ) : !schedulesFetching && schedules.length === 0 ? (
          <p
            className={
              'absolute top-1/2 left-1/2 text-nowrap mt-40 -translate-x-2/4 -translate-y-2/4 text-muted-foreground text-sm'
            }
          >
            {currentDay === 'вторник' ? 'Во' : 'В'} {currentDay} нет занятий.
          </p>
        ) : (
          <AnimatePresence>
            {schedules.map((schedule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SchedulesCard schedule={schedule} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { ScheduleCard } from '@/components/scheduleCard/scheduleCard';
import { Courses } from '@/features/home/components/courses/courses';
import { Days } from '@/features/home/components/days/days';
import { Groups } from '@/features/home/components/groups/groups';
import {
  selectDay,
  selectGroups,
  selectGroupsFetching,
  selectSchedule,
  selectScheduleFetching,
} from '@/features/home/homeSlice';
import { fetchGroups, fetchSchedules } from '@/features/home/homeThunks';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedDay = useAppSelector(selectDay);
  const groups = useAppSelector(selectGroups);
  const groupsFetching = useAppSelector(selectGroupsFetching);
  const schedules = useAppSelector(selectSchedule);
  const schedulesFetching = useAppSelector(selectScheduleFetching);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchSchedules());
  }, [dispatch]);

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
        <Groups groups={groups} fetching={groupsFetching} />
        <Days />
      </div>

      <div className='flex flex-col gap-2 relative h-full'>
        {schedulesFetching ? (
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
                <ScheduleCard schedule={schedule} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

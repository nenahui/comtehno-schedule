import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { selectDay, setDay } from '@/features/schedules/schedulesSlice';
import { fetchSchedules } from '@/features/schedules/schedulesThunks';
import React, { useEffect } from 'react';

export const Days: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedDay = useAppSelector(selectDay);
  const now = new Date().getDay();

  useEffect(() => {
    dispatch(setDay(now));
  }, [dispatch, now]);

  const handleChooseDays = async (day: number) => {
    dispatch(setDay(day));
    dispatch(fetchSchedules());
  };

  return (
    <ScrollArea className={'whitespace-nowrap w-full overflow-hidden relative'}>
      <div className={'flex items-center flex-nowrap space-x-2 rounded-full p-1'}>
        {[1, 2, 3, 4, 5].map((day) => (
          <button
            key={day}
            onClick={() => handleChooseDays(day)}
            className={`bg-muted text-black scale-95 ${selectedDay === day ? 'scale-105 dark:bg-slate-900 bg-primary text-white' : 'dark:bg-white'} text-[13px] p-2 rounded-full h-10 transition-all w-full px-3 duration-200`}
          >
            {day === 1 ? 'Пн' : day === 2 ? 'Вт' : day === 3 ? 'Ср' : day === 4 ? 'Чт' : 'Пт'}
          </button>
        ))}
      </div>
      <ScrollBar className={'hidden'} orientation={'horizontal'} />
    </ScrollArea>
  );
};

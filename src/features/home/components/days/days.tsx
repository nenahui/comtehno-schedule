import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { selectDay, setSelectedDay } from '@/features/home/homeSlice';
import { fetchSchedules } from '@/features/home/homeThunks';
import React, { useEffect } from 'react';

export const Days: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedDay = useAppSelector(selectDay);

  useEffect(() => {
    const day = localStorage.getItem('comtehno:day');
    if (day) {
      dispatch(setSelectedDay(parseFloat(day)));
    }
  }, [dispatch]);

  const handleChooseDays = async (day: number) => {
    dispatch(setSelectedDay(day));
    dispatch(fetchSchedules());
    localStorage.setItem('comtehno:day', day.toString());
  };

  return (
    <ScrollArea className={'whitespace-nowrap w-full overflow-hidden relative'}>
      <div className={'flex items-center flex-nowrap space-x-2 rounded-full p-1'}>
        {[1, 2, 3, 4, 5].map((day) => (
          <button
            key={day}
            onClick={() => handleChooseDays(day)}
            className={`bg-gray-200 text-black scale-95 ${selectedDay === day && 'scale-105 bg-gray-800 text-white'} text-xs p-2 rounded-full transition-all w-full px-3 duration-200`}
          >
            {day === 1 ? 'Пн' : day === 2 ? 'Вт' : day === 3 ? 'Ср' : day === 4 ? 'Чт' : 'Пт'}
          </button>
        ))}
      </div>
      <ScrollBar className={'hidden'} orientation={'horizontal'} />
    </ScrollArea>
  );
};

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { COURSES } from '@/consts';
import { selectCourse, setSelectedCourse } from '@/features/home/homeSlice';
import { fetchGroups } from '@/features/home/homeThunks';
import React, { useEffect } from 'react';

export const Courses: React.FC = () => {
  const selectedCourse = useAppSelector(selectCourse);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const course = localStorage.getItem('comtehno:course');
    if (course) {
      dispatch(setSelectedCourse(parseFloat(course)));
    }
  }, [dispatch]);

  const handleChooseCourse = (course: number) => {
    dispatch(setSelectedCourse(course));
    dispatch(fetchGroups());
    localStorage.setItem('comtehno:course', course.toString());
  };

  return (
    <ScrollArea className={'whitespace-nowrap w-full overflow-hidden relative'}>
      <div className={'flex items-center flex-nowrap space-x-2 rounded-full p-1'}>
        {COURSES.map((course) => (
          <button
            key={course}
            onClick={() => handleChooseCourse(course)}
            className={`bg-gray-200 text-black scale-95 ${selectedCourse === course && 'scale-105 bg-gray-800 text-white'} text-xs p-2 rounded-full transition-all w-full px-3 duration-200`}
          >
            {course} курс
          </button>
        ))}
      </div>
      <ScrollBar className={'hidden'} orientation={'horizontal'} />
    </ScrollArea>
  );
};

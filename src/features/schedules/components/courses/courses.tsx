import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { COURSES } from '@/consts';
import { fetchGroups } from '@/features/groups/groupsThunks';
import { selectCourse, setCourse } from '@/features/schedules/schedulesSlice';
import React, { useEffect } from 'react';

export const Courses: React.FC = () => {
  const selectedCourse = useAppSelector(selectCourse);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const course = localStorage.getItem('comtehno:course');
    if (course) {
      dispatch(setCourse(parseFloat(course)));
    }
  }, [dispatch]);

  const handleChooseCourse = (course: number) => {
    dispatch(setCourse(course));
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
            className={`bg-muted text-black scale-95 ${selectedCourse === course ? 'scale-105 bg-primary dark:bg-slate-900 text-white' : 'dark:bg-white'} text-sm p-2 h-10 rounded-full transition-all w-full px-3 duration-200`}
          >
            {course} курс
          </button>
        ))}
      </div>
      <ScrollBar className={'hidden'} orientation={'horizontal'} />
    </ScrollArea>
  );
};

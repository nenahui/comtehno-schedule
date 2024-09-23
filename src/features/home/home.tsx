import { ScheduleCard } from '@/components/scheduleCard/scheduleCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { timetable } from '@/features/home/data';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

export const Home: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredTimetable = selectedGroup ? timetable.filter((entry) => entry.group === selectedGroup) : timetable;
  const uniqueGroups = Array.from(new Set(timetable.map((entry) => entry.group)));

  const handleButtonClick = (group: string) => {
    setSelectedGroup(group);
  };

  return (
    <div className={'flex flex-col gap-3'}>
      <ScrollArea className={'whitespace-nowrap w-full overflow-hidden'}>
        <div className={'flex items-center flex-nowrap space-x-3 rounded-full p-2'}>
          {uniqueGroups.map((group, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(group)}
              className={`${selectedGroup === group ? 'bg-gray-800 text-white scale-110' : 'bg-gray-200 text-black scale-95'} text-sm p-2 rounded-full transition-all px-4 duration-200`}
            >
              {group}
            </button>
          ))}
        </div>
        <ScrollBar className={'hidden'} orientation={'horizontal'} />
      </ScrollArea>

      <div className='flex flex-col gap-2'>
        <AnimatePresence>
          {filteredTimetable.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ScheduleCard key={index} lesson={entry} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

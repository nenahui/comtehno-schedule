import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectGroup, setGroup } from '@/features/schedules/schedulesSlice';
import { fetchSchedules } from '@/features/schedules/schedulesThunks';
import type { Group } from '@/types';
import React, { useEffect, useRef } from 'react';

interface Props {
  groups: Group[];
  fetching: boolean;
}

export const GroupsList: React.FC<Props> = ({ groups, fetching }) => {
  const dispatch = useAppDispatch();
  const selectedGroup = useAppSelector(selectGroup);
  const groupRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const localGroup = localStorage.getItem('comtehno:group');
    const localGroupExists = groups.some((group) => group.id === parseFloat(localGroup || ''));
    if (localGroup && localGroupExists) {
      dispatch(setGroup(parseFloat(localGroup)));
      return;
    }

    if (groups.length > 0) {
      dispatch(setGroup(groups[0].id));
    }
  }, [dispatch, groups]);

  const handleChooseGroup = (id: number) => {
    localStorage.setItem('comtehno:group', id.toString());
    dispatch(setGroup(id));
    dispatch(fetchSchedules());
  };

  useEffect(() => {
    if (selectedGroup !== null) {
      const selectedElement = groupRefs.current[selectedGroup];
      selectedElement?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedGroup]);

  return (
    <div className={'whitespace-nowrap w-full overflow-hidden overflow-x-scroll relative'}>
      <div className={'flex items-center flex-nowrap space-x-2 rounded-full p-1'}>
        {!fetching && groups.length === 0 ? (
          <small className={'text-muted-foreground border grid place-items-center mx-auto w-full py-2 rounded-2xl'}>
            Список групп пуст.
          </small>
        ) : (
          groups.map((group) => (
            <button
              key={group.id}
              ref={(el) => (groupRefs.current[group.id] = el)}
              onClick={() => handleChooseGroup(group.id)}
              className={`bg-gray-200 text-black scale-95 ${selectedGroup === group.id && 'scale-105 bg-gray-800 text-white'} text-xs p-2 rounded-full transition-all px-3 duration-200`}
            >
              {group.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

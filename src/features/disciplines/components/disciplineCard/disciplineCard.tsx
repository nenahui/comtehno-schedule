import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { selectDisciplinesDeleting } from '@/features/disciplines/disciplinesSlice';
import { deleteDiscipline } from '@/features/disciplines/disciplinesThunks';
import type { Discipline } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  discipline: Discipline;
}

export const DisciplineCard: React.FC<Props> = ({ discipline }) => {
  const dispatch = useAppDispatch();
  const disciplinesDeleting = useAppSelector(selectDisciplinesDeleting);

  const handleDelete = () => {
    dispatch(deleteDiscipline(discipline.id));
  };

  return (
    <div className={'bg-white p-2 py-1 rounded-md flex text-black items-center gap-2 justify-between'}>
      <div className={'flex gap-2 items-center h-full max-w-[85%]'}>
        <h3 className={'leading-none text-sm'}>{discipline.name}</h3>
      </div>

      <Button
        onClick={handleDelete}
        disabled={Boolean(disciplinesDeleting)}
        size={'icon'}
        type={'button'}
        variant={'outline'}
        className={'text-white bg-slate-900'}
      >
        {disciplinesDeleting === discipline.id ? <Loader className={'text-muted-foreground size-4'} /> : <TrashIcon />}
      </Button>
    </div>
  );
};

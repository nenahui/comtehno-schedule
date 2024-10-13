import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { selectAdminGroupsDeleting } from '@/features/admin/adminSlice';
import { deleteGroup } from '@/features/admin/adminThunks';
import type { Group } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  group: Group;
}

export const GroupsCard: React.FC<Props> = ({ group }) => {
  const dispatch = useAppDispatch();
  const groupsDeleting = useAppSelector(selectAdminGroupsDeleting);

  const handleDelete = () => {
    dispatch(deleteGroup(group.id));
  };

  return (
    <div className={'bg-white p-2 py-1 rounded-md flex text-black items-center gap-2 justify-between'}>
      <div className={'flex gap-2 items-center h-full'}>
        <div className={'flex flex-col gap-1.5'}>
          <h3 className={'leading-none line-clamp-1 text-sm'}>{group.name}</h3>
        </div>
      </div>

      <Button
        onClick={handleDelete}
        disabled={Boolean(groupsDeleting)}
        size={'icon'}
        type={'button'}
        variant={'secondary'}
      >
        {groupsDeleting === group.id ? <Loader className={'text-muted-foreground size-4'} /> : <TrashIcon />}
      </Button>
    </div>
  );
};

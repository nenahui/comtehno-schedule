import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { selectAdminAudienceDeleting } from '@/features/admin/adminSlice';
import { deleteAudience } from '@/features/admin/adminThunks';
import type { Audience } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  audience: Audience;
}

export const AudienceCard: React.FC<Props> = ({ audience }) => {
  const dispatch = useAppDispatch();
  const audienceDeleting = useAppSelector(selectAdminAudienceDeleting);

  const handleDelete = () => {
    dispatch(deleteAudience(audience.id));
  };

  return (
    <div className={'bg-white p-2 py-1 rounded-md flex text-black items-center gap-2 justify-between'}>
      <div className={'flex gap-2 items-center h-full'}>
        <div className={'flex gap-3 items-center'}>
          <h3 className={'leading-none line-clamp-1 text-sm'}>{audience.number}</h3>
          <Badge variant={'secondary'} className={'leading-none line-clamp-1 text-xs font-light'}>
            {audience.typeDto.name}
          </Badge>
        </div>
      </div>

      <Button
        onClick={handleDelete}
        disabled={Boolean(audienceDeleting)}
        size={'icon'}
        type={'button'}
        variant={'secondary'}
      >
        {audienceDeleting === audience.id ? <Loader className={'text-muted-foreground size-4'} /> : <TrashIcon />}
      </Button>
    </div>
  );
};

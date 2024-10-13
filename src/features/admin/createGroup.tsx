import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectAdminGroups, selectAdminGroupsCreating, selectAdminGroupsFetching } from '@/features/admin/adminSlice';
import { createGroup, fetchGroups } from '@/features/admin/adminThunks';
import { GroupsCard } from '@/features/admin/components/groupsCard/groupsCard';
import type { GroupMutation } from '@/types';
import { TokensIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export const CreateGroup: React.FC = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectAdminGroups);
  const groupsFetching = useAppSelector(selectAdminGroupsFetching);
  const isCreating = useAppSelector(selectAdminGroupsCreating);
  const [groupMutation, setGroupMutation] = useState<GroupMutation>({
    name: '',
    course: '',
  });

  useEffect(() => {
    dispatch(fetchGroups(''));
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setGroupMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleCourseChange = (value: string) => {
    setGroupMutation((prev) => ({ ...prev, course: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!groupMutation.course) return;

      await dispatch(createGroup(groupMutation)).unwrap();
      setGroupMutation({
        name: '',
        course: '',
      });
      closeRef.current?.click();
    } catch (error) {
      console.log('catch');
      console.log(error);
      toast.error((error as any).message);
    }
  };

  return (
    <>
      <div className={'flex items-center justify-between border-b pb-1'}>
        <div>
          <h1 className={'text-lg leading-none'}>Группы</h1>
          <span className={'text-sm text-muted-foreground leading-none'}>Список всех групп.</span>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size={'sm'} className={'flex gap-1 items-center'}>
              Добавить группу <TokensIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={'max-w-lg mx-auto'}>
            <DrawerHeader>
              <DrawerTitle>Добавить группу</DrawerTitle>
              <DrawerDescription>Заполните все нижние поля, перед добавлением.</DrawerDescription>
              <form onSubmit={handleSubmit}>
                <div className={'space-y-2 text-left'}>
                  <div>
                    <Label htmlFor={'name'}>Название</Label>
                    <Input
                      id={'name'}
                      placeholder={'Введите название группы'}
                      required
                      onChange={handleChange}
                      value={groupMutation.name}
                    />
                  </div>

                  <Select value={groupMutation.course} onValueChange={(value) => handleCourseChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите курс' />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3].map((course) => (
                        <SelectItem key={course} value={course.toString()}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button disabled={isCreating} type={'submit'} size={'sm'} className={'w-full'}>
                    Добавить
                    {isCreating && <Loader className={'ml-2 size-4 text-muted-foreground'} />}
                  </Button>
                  <DrawerClose asChild ref={closeRef}>
                    <Button variant={'outline'} disabled={isCreating} type={'button'} size={'sm'} className={'w-full'}>
                      Отменить
                    </Button>
                  </DrawerClose>
                </div>
              </form>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
      {groupsFetching ? (
        <Loader absoluteCenter className={'text-muted-foreground size-5'} />
      ) : !groupsFetching && groups.length === 0 ? (
        <small>not</small>
      ) : (
        <div className={'flex flex-col gap-2 mt-3'}>
          {groups.map((group) => (
            <GroupsCard group={group} key={group.id} />
          ))}
        </div>
      )}
    </>
  );
};

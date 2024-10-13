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
import {
  selectAdminDisciplines,
  selectAdminDisciplinesCreating,
  selectAdminDisciplinesFetching,
} from '@/features/admin/adminSlice';
import { createDiscipline, fetchDisciplines } from '@/features/admin/adminThunks';
import { DisciplineCard } from '@/features/admin/components/disciplineCard/disciplineCard';

import type { DisciplineMutation } from '@/types';
import { BackpackIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';

export const CreateDiscipline: React.FC = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const disciplines = useAppSelector(selectAdminDisciplines);
  const disciplinesFetching = useAppSelector(selectAdminDisciplinesFetching);
  const isCreating = useAppSelector(selectAdminDisciplinesCreating);
  const [disciplineMutation, setDisciplineMutation] = useState<DisciplineMutation>({
    name: '',
  });

  useEffect(() => {
    dispatch(fetchDisciplines());
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setDisciplineMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(createDiscipline(disciplineMutation)).unwrap();
    setDisciplineMutation({
      name: '',
    });
    closeRef.current?.click();
  };

  return (
    <>
      <div className={'flex items-center justify-between border-b pb-1'}>
        <div>
          <h1 className={'text-lg leading-none'}>Дисциплины</h1>
          <span className={'text-sm text-muted-foreground leading-none'}>Список всех дисциплин.</span>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size={'sm'} className={'flex gap-1 items-center'}>
              Добавить дисциплину <BackpackIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={'max-w-lg mx-auto'}>
            <DrawerHeader>
              <DrawerTitle>Добавить дисциплину</DrawerTitle>
              <DrawerDescription>Заполните все нижние поля, перед добавлением.</DrawerDescription>
              <form onSubmit={handleSubmit} className={'w-full'}>
                <div className={'space-y-2 text-left'}>
                  <div>
                    <Label htmlFor={'name'}>Название</Label>
                    <Input
                      id={'name'}
                      placeholder={'Введите название дисциплины'}
                      required
                      onChange={handleChange}
                      value={disciplineMutation.name}
                    />
                  </div>

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
      {disciplinesFetching ? (
        <Loader absoluteCenter className={'text-muted-foreground size-5'} />
      ) : !disciplinesFetching && disciplines.length === 0 ? (
        <small>not</small>
      ) : (
        <div className={'flex flex-col gap-2 mt-3'}>
          {disciplines.map((discipline) => (
            <DisciplineCard discipline={discipline} key={discipline.id} />
          ))}
        </div>
      )}
    </>
  );
};

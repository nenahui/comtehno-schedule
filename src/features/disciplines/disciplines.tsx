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
import { DisciplineCard } from '@/features/disciplines/components/disciplineCard/disciplineCard';
import {
  selectDisciplines,
  selectDisciplinesCreating,
  selectDisciplinesFetching,
} from '@/features/disciplines/disciplinesSlice';
import { createDiscipline, fetchDisciplines } from '@/features/disciplines/disciplinesThunks';
import type { DisciplineMutation } from '@/types';
import { BackpackIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';

const initialState: DisciplineMutation = {
  name: '',
};

export const Disciplines: React.FC = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const disciplines = useAppSelector(selectDisciplines);
  const disciplinesFetching = useAppSelector(selectDisciplinesFetching);
  const disciplinesCreating = useAppSelector(selectDisciplinesCreating);
  const [disciplineMutation, setDisciplineMutation] = useState<DisciplineMutation>(initialState);

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
    setDisciplineMutation(initialState);
    closeRef.current?.click();
  };

  return (
    <>
      <div className={'flex items-center justify-between border-b pb-1'}>
        <div>
          <h1 className={'text-lg leading-none'}>Дисциплины</h1>
          <span className={'text-sm text-muted-foreground leading-none'}>Список всех дисциплин.</span>
        </div>
        <Drawer fadeFromIndex={1} snapPoints={[1, 1]}>
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

                  <Button disabled={disciplinesCreating} type={'submit'} size={'sm'} className={'w-full'}>
                    Добавить
                    {disciplinesCreating && <Loader className={'ml-2 size-4 text-muted-foreground'} />}
                  </Button>
                  <DrawerClose asChild ref={closeRef}>
                    <Button
                      variant={'outline'}
                      disabled={disciplinesCreating}
                      type={'button'}
                      size={'sm'}
                      className={'w-full'}
                    >
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

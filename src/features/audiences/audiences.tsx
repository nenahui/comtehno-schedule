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
import { AudienceCard } from '@/features/audiences/components/audienceCard/audienceCard';
import {
  selectAudienceCreating,
  selectAudiences,
  selectAudiencesFetching,
  selectAudiencesTypes,
  selectAudienceTypesFetching,
} from '@/features/audiences/audiencesSlice';
import { createAudience, fetchAudiences, fetchAudienceTypes } from '@/features/audiences/audiencesThunks';
import type { AudienceMutation } from '@/types';
import { HomeIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';

const initialState: AudienceMutation = {
  capacity: '',
  floor: '',
  number: '',
  typeId: '',
};

export const Audiences: React.FC = () => {
  const [audienceMutation, setAudienceMutation] = useState<AudienceMutation>(initialState);
  const dispatch = useAppDispatch();
  const audiences = useAppSelector(selectAudiences);
  const audienceTypes = useAppSelector(selectAudiencesTypes);
  const audiencesFetching = useAppSelector(selectAudiencesFetching);
  const audiencesTypesFetching = useAppSelector(selectAudienceTypesFetching);
  const audiencesCreating = useAppSelector(selectAudienceCreating);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(fetchAudiences());
    dispatch(fetchAudienceTypes());
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAudienceMutation((prev) => ({ ...prev, [id]: value }));
  };

  const handleTypeChange = (value: string) => {
    setAudienceMutation((prev) => ({ ...prev, typeId: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!audienceMutation.typeId) return;

    await dispatch(createAudience(audienceMutation)).unwrap();
    setAudienceMutation(initialState);
    closeRef.current?.click();
  };

  return (
    <>
      <div className={'flex items-center justify-between border-b pb-1'}>
        <div>
          <h1 className={'text-lg leading-none'}>Аудитории</h1>
          <span className={'text-sm text-muted-foreground leading-none'}>Список всех аудиторий.</span>
        </div>
        <Drawer snapPoints={[1, 1]} fadeFromIndex={1}>
          <DrawerTrigger asChild>
            <Button size={'sm'} className={'flex gap-1 items-center'}>
              Добавить аудиторию <HomeIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={'max-w-lg mx-auto'}>
            <DrawerHeader>
              <DrawerTitle>Добавить аудиторию</DrawerTitle>
              <DrawerDescription>Заполните все нижние поля, перед добавлением.</DrawerDescription>
              <form onSubmit={handleSubmit}>
                <div className={'space-y-2'}>
                  <div>
                    <Label htmlFor={'number'}>Номер</Label>
                    <Input
                      type={'number'}
                      id={'number'}
                      placeholder={'Введите номер аудитории'}
                      onChange={handleChange}
                      value={audienceMutation.number}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={'floor'}>Этаж</Label>
                    <Input
                      type={'number'}
                      id={'floor'}
                      placeholder={'Введите этаж аудитории'}
                      onChange={handleChange}
                      value={audienceMutation.floor}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={'capacity'}>Вместимость</Label>
                    <Input
                      type={'number'}
                      id={'capacity'}
                      placeholder={'Введите вместимость аудитории'}
                      onChange={handleChange}
                      value={audienceMutation.capacity}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={'type'}>Тип</Label>
                    <Select
                      disabled={audiencesTypesFetching}
                      value={audienceMutation.typeId}
                      onValueChange={(value) => handleTypeChange(value)}
                    >
                      <SelectTrigger id={'type'}>
                        <SelectValue placeholder='Выберите тип аудитории' />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceTypes.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={'flex gap-2 flex-col'}>
                    <Button disabled={audiencesCreating || audiencesFetching || audiencesTypesFetching}>
                      Создать {audiencesCreating && <Loader className={'ml-2 size-4 text-muted-foreground'} />}
                    </Button>
                    <DrawerClose asChild ref={closeRef}>
                      <Button disabled={audiencesCreating} variant={'outline'}>
                        Отменить
                      </Button>
                    </DrawerClose>
                  </div>
                </div>
              </form>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
      {audiencesTypesFetching || audiencesFetching ? (
        <Loader absoluteCenter className={'text-muted-foreground size-5'} />
      ) : !audiencesTypesFetching && !audiencesFetching && audiences.length === 0 ? (
        <small>not</small>
      ) : (
        <div className={'flex flex-col gap-2 mt-3'}>
          {audiences.map((audience) => (
            <AudienceCard audience={audience} key={audience.id} />
          ))}
        </div>
      )}
    </>
  );
};

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { type HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
}

export const UsersInput: React.FC<Props> = ({ label, error, ...inputProps }) => {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label
        htmlFor={inputProps.name}
        className={`flex justify-between items-center gap-3 ${error && error.length > 50 && 'flex-col gap-1 items-start'} `}
      >
        {label}
        {error && (
          <span className={`text-red-600 font-normal ${error && error.length > 30 && 'text-sm'}`}>{error}</span>
        )}
      </Label>
      <Input id={inputProps.name} {...inputProps} />
    </div>
  );
};

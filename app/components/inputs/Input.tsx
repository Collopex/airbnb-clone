'use client';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={20}
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        className={`peer w-full p-2 pt-5 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? 'pl-9' : 'pl-4'
        }
          ${
            errors[id]
              ? 'border-rose-200 focus:border-rose-200 '
              : ' border-neutral-300 focus:border-black'
          }
        `}
      />
      <label
        className={`absolute text-base duration-150 transform -translate-y-3 top-[16px] z-10 origin-[0] ${
          formatPrice ? 'left-9' : 'left-4'
        } 
        text-neutral-400
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? 'text-roseborder-rose-200' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

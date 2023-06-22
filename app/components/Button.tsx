'use client';

import React from 'react';
import { IconType } from 'react-icons';

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};
const Button = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  outline,
  small,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
      ${
        outline
          ? 'bg-white border-gray-600 text-black'
          : 'bg-[#FF385C] border-[#FF385C] text-white'
      }
      ${
        small
          ? 'py-1 text-sm font-normal border-[1px]'
          : 'py-[6px] text-base font-bold border-2'
      }
      `}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-[6px]' />}
      {label}
    </button>
  );
};

export default Button;

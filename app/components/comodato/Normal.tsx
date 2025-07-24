'use client'

import React, { ChangeEvent } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  enable?: boolean
}

const FormReduzido: React.FC<FormInputProps> = ({ label, name, value, onChange, placeholder, isInvalid, errorMessage,enable }) => (
  <div className="flex flex-col">
    <p>{label}</p>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${isInvalid ? 'border-red-500' : 'border-transparent'}`}
      placeholder={placeholder}
      disabled={enable}
    />
    {isInvalid && errorMessage && (
      <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
    )}
  </div>
);

export default FormReduzido;
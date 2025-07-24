'use client';

import React, { ChangeEvent } from 'react';

interface TelefoneInputProps {
  label: string;
  name: string;
  value: string; // só números limpos
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const formatTelefone = (value: string): string => {
  const numericValue = value.replace(/\D/g, '').slice(0, 11);

  if (numericValue.length <= 2) {
    return numericValue ? `(${numericValue}` : '';
  } else if (numericValue.length <= 6) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
  } else if (numericValue.length <= 10) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
  } else {
    // 11 dígitos (celular com 9 dígitos)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 3)} ${numericValue.slice(3, 7)}-${numericValue.slice(7)}`;
  }
};

const TelefoneInputReduzido: React.FC<TelefoneInputProps> = ({
  label,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 11);

    const fakeEvent = {
      ...e,
      target: {
        ...e.target,
        value: rawValue,
        name,
      },
    };

    onChange(fakeEvent as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col">
      <p>{label}</p>
      <input
        type="text"
        name={name}
        value={formatTelefone(value)}
        onChange={handleChange}
        maxLength={16} // ex: (99) 9 9999-9999 tem 16 caracteres
        className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
          isInvalid ? 'border-red-500' : 'border-transparent'
        }`}
        placeholder="(99) 9 9999-9999"
      />
      {isInvalid && errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default TelefoneInputReduzido;

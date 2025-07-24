'use client';

import React, { ChangeEvent } from 'react';

interface CPFInputProps {
  label: string;
  name: string;
  value: string; // valor limpo, só números
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, '').slice(0, 11);

  let formatted = numericValue;

  if (numericValue.length > 3) {
    formatted = numericValue.slice(0, 3) + '.' + numericValue.slice(3);
  }
  if (numericValue.length > 6) {
    formatted =
      numericValue.slice(0, 3) +
      '.' +
      numericValue.slice(3, 6) +
      '.' +
      numericValue.slice(6);
  }
  if (numericValue.length > 9) {
    formatted =
      numericValue.slice(0, 3) +
      '.' +
      numericValue.slice(3, 6) +
      '.' +
      numericValue.slice(6, 9) +
      '-' +
      numericValue.slice(9);
  }

  return formatted;
};

const CPFInputReduzido: React.FC<CPFInputProps> = ({
  label,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
}) => {
  // value: só números (limpo)
  // exibe valor formatado no input

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 11);

    // Criar evento falso para enviar só números para o onChange
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
        value={formatCPF(value)}
        onChange={handleChange}
        maxLength={14}
        className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
          isInvalid ? 'border-red-500' : 'border-transparent'
        }`}
        placeholder="000.000.000-00"
      />
      {isInvalid && errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default CPFInputReduzido;

'use client';

import React, { ChangeEvent } from 'react';

interface CEPInputProps {
  label: string;
  name: string;
  value: string; // valor limpo, só números
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const formatCEP = (value: string): string => {
  const numericValue = value.replace(/\D/g, '').slice(0, 8);

  if (numericValue.length > 5) {
    return numericValue.slice(0, 5) + '-' + numericValue.slice(5);
  }

  return numericValue;
};

const CEPInputReduzido: React.FC<CEPInputProps> = ({
  label,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 8);

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
        value={formatCEP(value)}
        onChange={handleChange}
        maxLength={9} // 8 números + hífen
        className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
          isInvalid ? 'border-red-500' : 'border-transparent'
        }`}
        placeholder="00000-000"
      />
      {isInvalid && errorMessage && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default CEPInputReduzido;

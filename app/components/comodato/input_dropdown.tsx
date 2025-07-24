'use client';
import React from 'react';
import { Dropdown } from 'primereact/dropdown';

interface FormDropdownProps {
  label: string;
  name: string;
  value: string;
  options: { label: string, value: string }[];
  onChange: (e: any) => void;
}

const FormDropdown: React.FC<FormDropdownProps> = ({ label, name, value, options, onChange }) => (
  <div className="flex flex-col">
    <p>{label}</p>
<Dropdown
  value={value}
  options={options}
  onChange={onChange}
  placeholder="Selecione uma opção"
  className="h-12 w-full bg-gray-300 rounded-md"
  panelClassName="bg-gray-300 rounded-md shadow-lg"
  itemTemplate={(option) => (
    <div className="text-gray-800 py-2 px-3">
      {option.label}
    </div>
  )}
/>

  </div>
);

export default FormDropdown;

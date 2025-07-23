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
      className="h-12 w-full bg-gray-300 rounded-md flex justify-center items-center"
      panelClassName="bg-gray-300 rounded-md shadow-lg"
      itemClassName="text-gray-800 py-2 px-3" // Estilo para itens de lista
      selectedItemClassName="bg-blue-500 text-white" // Cor de fundo e texto quando selecionado
    />
  </div>
);

export default FormDropdown;


'use client'
import { useState } from 'react';

export const useFormData = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    rg: "",
    cep: "",
    bairro: "",
    telefone: "",
    telefone2: "",
    profissao: "",
    estado_civil: "",
    rua: "",
    numero_casa: "",
    complemento: "",
    cidade_id: "",
    data: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleDropdownChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return { formData, handleInputChange, handleDropdownChange };
};

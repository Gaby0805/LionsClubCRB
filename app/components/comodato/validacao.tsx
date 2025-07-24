'use client'

export const isInvalidCPF = (cpf: string) => {
  return cpf.length > 11 || /[^\d]/.test(cpf);
};

export const isInvalidRG = (rg: string) => {
  return rg.length > 15 || /[^\d]/.test(rg);
};

export const cargos = [
  "Ana Karina ", // acesso a tudo
  "Presidente",
  "Adm",
  "Vice",
  "1º secretária",
  "2º secretária",
  "Coordenador de banco ortopédico",
  "Diretor de Patrimonio",
  "inativo"
];
export const cargos_expostos = [
  "Presidente",
  "Vice",
  "1º secretária",
  "2º secretária",
  "Coordenador de banco ortopédico",
  "Diretor de Patrimonio",
  "inativo"
];

export const permissoesPorCargo: Record<string, string[]> = {
  "Ana Karina ": ["comodato", "inventario", "inventariog", "relatorio", "stats", "correspondencia"],
  "Adm": ["comodato", "inventario", "inventariog", "relatorio", "stats", "correspondencia"] ,
  "Presidente": ["comodato", "inventario", "inventariog", "relatorio", "stats"],
  "Vice": ["comodato", "inventario", "inventariog", "relatorio", "stats"],
  "1º secretária": ["comodato", "inventario", "inventariog", "relatorio", "stats"],
  "2º secretária": ["comodato", "relatorio", "stats"],
  "Coordenador de banco ortopédico": ["inventariog", "inventario"],
  "Diretor de Patrimonio": ["inventario", "inventariog"],
  "inativo": [] // sem acesso
};

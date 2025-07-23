// components/pagination.tsx
'use client'
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Itempage: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-1 bg-gray-300 rounded">
        Anterior
      </button>
      <span>{currentPage} de {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-300 rounded">
        Próximo
      </button>
    </div>
  );
};

export default Itempage;

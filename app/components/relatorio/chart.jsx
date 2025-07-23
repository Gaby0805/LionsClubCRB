import React, { useEffect, useState } from "react";
import axios from "axios";
import { ColumnChart, PieChart, BarChart } from "react-chartkick";
import "chartkick/chart.js";

export default function Charts() {
  const [comodatoPorCidade, setComodatoPorCidade] = useState([]);
  const [emprestimosTotais, setEmprestimosTotais] = useState([]);
  const [comodatosPorMes, setComodatosPorMes] = useState([]);
  const [materiaisTop, setMateriaisTop] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const BASE_URL = "https://leoncio-backend-production.up.railway.app";

      try {
        // 1. Municípios com mais contratos (formato especial)
        const resCidade = await axios.get(`${BASE_URL}/relatorio/comodatocidade`, { headers });
        const cidadesObj = resCidade.data[0] || {};

        const formatadoCidade = Object.entries(cidadesObj)
          .filter(([key]) => key !== "total_geral")
          .map(([cidade, qtd]) => [
            cidade.charAt(0).toUpperCase() + cidade.slice(1), // Capitaliza
            Number(qtd),
          ]);

        setComodatoPorCidade(formatadoCidade);
      } catch (error) {
        console.error("Erro em /comodatocidade:", error);
      }

      try {
        // 2. Totais por status com data
        const resStatus = await axios.get(`${BASE_URL}/relatorio/usersdata`, { headers });
        const formatadoStatus = resStatus.data.map(item => [item.data_label, item.total]);
        setEmprestimosTotais(formatadoStatus);
      } catch (error) {
        console.error("Erro em /usersdata:", error);
      }

      try {
        // 3. Totais por mês (ano fixo por enquanto)
        const resMes = await axios.post(`${BASE_URL}/relatorio/usersmes`, { ano: 2024 }, { headers });
        const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
        const dadosMes = resMes.data[0] || {};

        const formatadoMes = meses.map(mes => [mes, Number(dadosMes[mes] || 0)]);
        setComodatosPorMes(formatadoMes);
      } catch (error) {
        console.error("Erro em /usersmes:", error);
      }

      try {
        // 4. Materiais mais emprestados
        const resTop = await axios.get(`${BASE_URL}/relatorio/top`, { headers });
        const formatadoTop = resTop.data.map(item => [item.nome_material, item.qtd_emprestimo]);
        setMateriaisTop(formatadoTop);
      } catch (error) {
        console.error("Erro em /top:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-5 grid grid-cols-2 grid-rows-2 gap-5">
      <div className="p-4 flex justify-center items-center flex-col">
        <h3 className="text-[24px]">Município com mais contratos</h3>
        <ColumnChart data={comodatoPorCidade} />
      </div>

      <div className="flex justify-center items-center flex-col">
        <h3 className="text-[24px]">Empréstimos de comodatos</h3>
        <PieChart data={emprestimosTotais} />
      </div>

      <div className="flex justify-center items-center flex-col">
        <h3 className="text-[24px]">Meses com mais demandas</h3>
        <ColumnChart data={comodatosPorMes} />
      </div>

      <div className="flex justify-center items-center flex-col">
        <h3 className="text-[24px]">Materiais mais doados</h3>
        <BarChart data={materiaisTop} />
      </div>
    </div>
  );
}

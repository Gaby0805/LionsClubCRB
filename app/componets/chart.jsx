import React from "react";
import { ColumnChart, PieChart,BarChart } from 'react-chartkick'
import 'chartkick/chart.js'


export default function Charts(){




    
    return(
<div className="m-5 grid grid-cols-2 grid-rows-2  gap-5   ">
  <div className=" p-4 flex justify-center items-center flex-col">
        <h3 className="text-[24px]">
            municipio com mais contratos
        </h3>

<ColumnChart data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} />  

</div>


  <div className=" flex justify-center items-center flex-col "> 

        <h3 className="text-[24px]">
            Emprestimos de comodatos
        </h3>

    <PieChart data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} />  


  </div>
  
  <div className="flex justify-center items-center flex-col">
        <h3 className="text-[24px]">
            Meses que houve mais demandas de contratos
        </h3>

<ColumnChart data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} />  

</div>
  
  <div className=" flex justify-center items-center flex-col">  
          <h3 className="text-[24px]">
                Materiais mais doados 
          </h3>

<BarChart data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} />  
</div>
</div>
    )


}
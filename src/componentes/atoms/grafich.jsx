import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Grafich() {
  
  const gerarDadosAleatorios = () => {
    const labels = ['A', 'B', 'C', 'D'];
    const valores = labels.map(() => Math.floor(Math.random() * 100));
    const total = valores.reduce((acc, val) => acc + val, 0);

    // Garantir que a soma seja 100% arredondando os valores
    const valoresArredondados = valores.map(val => Math.round((val / total) * 100));

    // Ajustar o total para garantir que a soma seja 100%
    const ajuste = 100 - valoresArredondados.reduce((acc, val) => acc + val, 0);
    valoresArredondados[0] += ajuste; // Ajuste no primeiro valor para garantir soma 100%
    return {
      labels,
      datasets: [
        {
          data: valoresArredondados,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }
      ]
    };
  };

  return (
    <div className='d-flex align-items-center justify-content-center' style={{ width: '300px', height: '300px' }}>
      <Pie data={gerarDadosAleatorios()} />
    </div>
  );
}

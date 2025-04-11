import React, { useState } from "react";

const numerosTotales = Array.from({ length: 37 }, (_, i) => i);
const apuestaPorNumero = 50;
const pagoPleno = 35;

export default function RuletaSimulador() {
  const [saldo, setSaldo] = useState(0);
  const [historial, setHistorial] = useState([]);
  const [numerosApostados, setNumerosApostados] = useState(23);

  const tirarRuleta = () => {
    const seleccion = [...numerosTotales].sort(() => 0.5 - Math.random()).slice(0, numerosApostados);
    const numeroSalida = numerosTotales[Math.floor(Math.random() * numerosTotales.length)];
    const ganancia = seleccion.includes(numeroSalida) ? apuestaPorNumero * pagoPleno : 0;
    const inversion = seleccion.length * apuestaPorNumero;
    const neto = ganancia - inversion;
    setSaldo(prev => prev + neto);

    setHistorial(prev => [
      { salida: numeroSalida, resultado: neto, saldo: saldo + neto },
      ...prev.slice(0, 9)
    ]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Simulador de Ruleta</h2>
      <p>Apostando a <strong>{numerosApostados}</strong> números con ${apuestaPorNumero} cada uno</p>
      <input
        type="range"
        min="1"
        max="36"
        value={numerosApostados}
        onChange={e => setNumerosApostados(parseInt(e.target.value))}
      />
      <p>Saldo total: <strong>${saldo}</strong></p>
      <button onClick={tirarRuleta} style={{ marginTop: '10px' }}>Tirar Ruleta</button>
      <div style={{ marginTop: '1rem' }}>
        {historial.map((item, index) => (
          <div key={index}>
            Tiro {historial.length - index}: salió {item.salida}, resultado ${item.resultado}, saldo: ${item.saldo}
          </div>
        ))}
      </div>
      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#888' }}>
        Creado por Gust-RC
      </footer>
    </div>
  );
    }

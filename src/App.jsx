import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { FaBoxOpen } from "react-icons/fa";
import "./App.css";

const API_URL = "https://script.google.com/macros/s/AKfycbzzzOdF39SaOkzYIOoFP7OhsLW8P8g_VSOut6NuAd6HiHp0HfZaxswL4SO5FH1wklAeBQ/exec";

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(res => setDados(res.data));
  }, []);

  const totalEstoque = dados.reduce((s, item) => s + Number(item.estoque || 0), 0);

  return (
    <div className="container">
      <header>
        <h1>📦 Dashboard de Estoque</h1>
        <p>Integração Google Sheets → React → Render</p>
      </header>

      <div className="cards">
        <div className="card">
          <FaBoxOpen size={40} />
          <h3>Total de SKUs</h3>
          <p>{dados.length}</p>
        </div>

        <div className="card">
          <FaBoxOpen size={40} />
          <h3>Estoque Total</h3>
          <p>{totalEstoque}</p>
        </div>
      </div>

      <div className="chart">
        <h2>Estoque por Categoria</h2>
        <Bar
          data={{
            labels: [...new Set(dados.map(d => d.categoria))],
            datasets: [
              {
                label: "Qtd em Estoque",
                data: [...new Set(dados.map(d => d.categoria))].map(cat =>
                  dados
                    .filter(d => d.categoria === cat)
                    .reduce((s, i) => s + Number(i.estoque || 0), 0)
                ),
              },
            ],
          }}
        />
      </div>

      <h2>Lista de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nome</th>
            <th>Estoque</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.SKU}>
              <td>{item.SKU}</td>
              <td>{item.Nome}</td>
              <td>{item.estoque}</td>
              <td>{item.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

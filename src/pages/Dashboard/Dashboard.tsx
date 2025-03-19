import { useState } from "react";
import CotasList from "../../components/CotasList/CotasList";
import CotasForm from "../../components/CotasForm/CotasForm";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [cotas, setCotas] = useState([
    { id: 1, nome: "Cota 1", valor: 10000 },
    { id: 2, nome: "Cota 2", valor: 15000 },
  ]);
  const [editando, setEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const adicionarCota = (novaCota) => {
    setCotas([...cotas, { ...novaCota, id: Date.now() }]);
    setModalAberto(false);
  };

  const editarCota = (cotaEditada) => {
    setCotas(cotas.map((cota) => (cota.id === cotaEditada.id ? cotaEditada : cota)));
    setEditando(null);
    setModalAberto(false);
  };

  const deletarCota = (id) => {
    setCotas(cotas.filter((cota) => cota.id !== id));
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard de Cotas</h1>
      <button onClick={() => setModalAberto(true)}>Adicionar Cota</button>
      {modalAberto && (
        <CotasForm 
          adicionarCota={adicionarCota} 
          editarCota={editarCota} 
          editando={editando} 
          fecharModal={() => setModalAberto(false)}
        />
      )}
      <CotasList cotas={cotas} setEditando={setEditando} deletarCota={deletarCota} />
    </div>
  );
};

export default Dashboard;

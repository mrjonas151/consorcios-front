import { useState } from "react";
import CotasList from "../../components/CotasList/CotasList";
import CotasForm from "../../components/CotasForm/CotasForm";
import styles from "./Dashboard.module.css";
import { Cota } from "../../types/ConsorcioTypes";

const Dashboard = () => {
  const [cotas, setCotas] = useState<Cota[]>([
    {
      id: 1,
      nome: "Cota 1",
      numeroCota: "001",
      valor: 1000,
      status: "DISPONIVEL",
      grupoId: 1,
      grupo: { 
        id: 1, 
        nome: "Grupo 1", 
        administradoraId: 1 
      },
      clienteId: 1,
      cliente: { 
        id: 1, 
        nome: "Cliente 1", 
        cpf: "123.456.789-00",
        email: "cliente1@exemplo.com"
      }
    },
    {
      id: 2,
      nome: "Cota 2",
      numeroCota: "002",
      valor: 1500,
      status: "VENDIDA",
      grupoId: 2,
      grupo: { 
        id: 2, 
        nome: "Grupo 2", 
        administradoraId: 1 
      },
      clienteId: 2,
      cliente: { 
        id: 2, 
        nome: "Cliente 2", 
        cpf: "987.654.321-00",
        email: "cliente2@exemplo.com"
      }
    },
    {
      id: 3,
      nome: "Cota 3",
      numeroCota: "003",
      valor: 2000,
      status: "CONTEMPLADA",
      grupoId: 3,
      grupo: { 
        id: 3, 
        nome: "Grupo 3", 
        administradoraId: 2 
      },
      clienteId: 3,
      cliente: { 
        id: 3, 
        nome: "Cliente 3", 
        cpf: "111.222.333-44",
        email: "cliente3@exemplo.com"
      }
    },
  ]);

  const [editando, setEditando] = useState<Cota | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const adicionarCota = (novaCota: Cota) => {
    setCotas([...cotas, { ...novaCota, id: Date.now() }]);
    setModalAberto(false);
  };

  const editarCota = (cotaEditada: Cota) => {
    setCotas(cotas.map((cota) => (cota.id === cotaEditada.id ? cotaEditada : cota)));
    setEditando(null);
    setModalAberto(false);
  };

  const deletarCota = (id: number) => {
    setCotas(cotas.filter((cota) => cota.id !== id));
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard de Cotas</h1>
      <button 
        className={styles.addButton}
        onClick={() => {
          setEditando(null);
          setModalAberto(true);
        }}
      >
        Adicionar Cota
      </button>
      
      {modalAberto && (
        <CotasForm 
          adicionarCota={adicionarCota} 
          editarCota={editarCota} 
          editando={editando} 
          fecharModal={() => setModalAberto(false)}
        />
      )}
      
      <CotasList 
        cotas={cotas} 
        setEditando={(cota) => {
          setEditando(cota);
          setModalAberto(true);
        }} 
        deletarCota={deletarCota} 
      />
    </div>
  );
};

export default Dashboard;
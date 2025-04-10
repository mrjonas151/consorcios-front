import { useState } from "react";
import CotasForm from "../../components/CotasForm/CotasForm";
import CotaDetails from "../../components/CotasDetails/CotaDetails";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import styles from "./Dashboard.module.css";
import { Cota } from "shared/types";
import { IoMdExit } from "react-icons/io";
import starLogo from "../../assets/star_image.png";
import { useDispatch } from 'react-redux'; 
import { logout } from 'shared/authSlice'; 
import CotasList from "../../components/CotasList/CotasList";

const Dashboard = () => {

  const dispatch = useDispatch();

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
    {
      id: 4,
      nome: "Cota 4",
      numeroCota: "004",
      valor: 2500,
      status: "CONTEMPLADA",
      grupoId: 1,
      grupo: { 
        id: 1, 
        nome: "Grupo 1", 
        administradoraId: 1 
      },
      clienteId: 4,
      cliente: { 
        id: 4, 
        nome: "Cliente 4", 
        cpf: "555.666.777-88",
        email: "teste@gmail.com"
      },
    },
  ]);

  const cotaVazia: Cota = {
  id: 0,
  nome: "",
  numeroCota: "",
  valor: 0,
  status: "",
  grupoId: 0,
  grupo: { id: 0, nome: "", administradoraId: 0 }
};

  const [modalAberto, setModalAberto] = useState<Boolean>(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState<Boolean>(false);
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState<Boolean>(false);
  const [cotaParaDeletar, setCotaParaDeletar] = useState<Cota>(cotaVazia);
  const [editando, setEditando] = useState<Cota>(cotaVazia);
  const [visualizando, setVisualizando] = useState<Cota>(cotaVazia);

  const adicionarCota = (novaCota: Cota) => {
    setCotas([...cotas, { ...novaCota, id: Date.now() }]);
    setModalAberto(false);
  };

  const editarCota = (cotaEditada: Cota) => {
    setCotas(cotas.map((cota) => (cota.id === cotaEditada.id ? cotaEditada : cota)));
    setEditando(cotaVazia);
    setModalAberto(false);
  };

  const confirmarDeletarCota = (cota: Cota) => {
    setCotaParaDeletar(cota);
    setModalConfirmacaoAberto(true);
  };

  const deletarCota = () => {
    if (cotaParaDeletar) {
      setCotas(cotas.filter((cota) => cota.id !== cotaParaDeletar.id));
      setModalConfirmacaoAberto(false);
      setCotaParaDeletar(cotaVazia);
    }
  };

  const verDetalhesCota = (cota: Cota) => {
    setVisualizando(cota);
    setModalDetalhesAberto(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <img src={starLogo} alt="Logo" />
        <div className={styles.headerContent}>
          <h1>Dashboard de Cotas</h1>
          <button 
            className={styles.addButton}
            onClick={() => {
              setEditando(cotaVazia);
              setModalAberto(true);
            }}
          >
            Adicionar Cota
          </button>
        </div>
        <div className={styles.icon} onClick={handleLogout}>
          <IoMdExit color="red" size={30} />
        </div>
      </div>
      
      {modalAberto && (
        <CotasForm 
          adicionarCota={adicionarCota} 
          editarCota={editarCota} 
          editando={editando} 
          fecharModal={() => setModalAberto(false)}
        />
      )}

      {modalDetalhesAberto && visualizando && (
        <CotaDetails
          cota={visualizando}
          fecharModal={() => setModalDetalhesAberto(false)}
        />
      )}

      {modalConfirmacaoAberto && cotaParaDeletar && (
        <ConfirmationModal
          title="Confirmar exclusão"
          message={`Tem certeza que deseja excluir a cota ${cotaParaDeletar.nome || cotaParaDeletar.numeroCota}?`}
          onConfirm={deletarCota}
          onCancel={() => {
            setModalConfirmacaoAberto(false);
            setCotaParaDeletar(cotaVazia);
          }}
        />
      )}
      
      <CotasList 
        cotas={cotas} 
        setEditando={(cota) => {
          setEditando(cota);
          setModalAberto(true);
        }} 
        deletarCota={confirmarDeletarCota} 
        verDetalhesCota={verDetalhesCota}
      />
    </div>
  );
};

export default Dashboard;
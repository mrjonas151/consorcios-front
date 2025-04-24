import { useEffect, useState } from "react";
import CotasForm from "../../components/CotasForm/CotasForm";
import CotaDetails from "../../components/CotasDetails/CotaDetails";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import styles from "./Dashboard.module.css";
import { Cota } from "shared/types";
import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'; 
import { logout } from 'shared/authSlice'; 
import CotasList from "../../components/CotasList/CotasList";
import { toast } from "react-toastify";
import { createCota, fetchCotas, updateCota, removeCota } from "shared/cotasSlice";

const Dashboard = () => {

  const dispatch = useDispatch();

  interface RootState {
    auth: {
      isAuthenticated: boolean;
      user: { id: string; username: string; email: string } | null;
      token: string | null;
    };
    cotas: {
      items: Cota[];
      selectedCota: Cota | null;
      status: "idle" | "loading" | "succeeded" | "failed";
      error: string | null;
    };
  }
  
  const { items: cotas, status, error } = useSelector((state: RootState) => state.cotas);
  const isLoading = status === "loading";

  const starLogo = "https://firebasestorage.googleapis.com/v0/b/travel-app-d9bdb.appspot.com/o/star_image.png?alt=media&token=0cf0051f-bf47-4d15-b5e2-70677ab94474";


  const cotaVazia: Cota = {
  id: 0, 
  numeroCota: "",
  valor: 0,
  status: "DISPONIVEL", 
  grupoId: 0, 
  grupo: {
    id: 0, nome: "",
    administradoraId: 0
  } 
};

  const [modalAberto, setModalAberto] = useState<Boolean>(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState<Boolean>(false);
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState<Boolean>(false);
  const [cotaParaDeletar, setCotaParaDeletar] = useState<Cota>(cotaVazia);
  const [editando, setEditando] = useState<Cota>(cotaVazia);
  const [visualizando, setVisualizando] = useState<Cota>(cotaVazia);

  useEffect(() => {
    dispatch(fetchCotas() as any);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Erro: ${error}`);
    }
  }, [error]);

  const adicionarCota = async (novaCota: Cota) => {
    try {      
      const createInput = {
        numeroCota: novaCota.numeroCota, 
        valor: Number(novaCota.valor), 
        status: novaCota.status,
        grupoId: String(novaCota.grupoId), 
        clienteId: novaCota.clienteId ? String(novaCota.clienteId) : null 
      };
            
      const resultAction = await dispatch(createCota(createInput) as any);
      
      if (!resultAction.error) {
        setModalAberto(false);
        toast.success("Cota adicionada com sucesso!");
        dispatch(fetchCotas() as any);
      } else {
        toast.error(`Erro: ${resultAction.payload || "Falha ao adicionar cota"}`);
      }
    } catch (err: any) {
      console.error("Erro ao adicionar cota:", err);
      toast.error(`Erro: ${err.message || "Erro desconhecido ao adicionar cota"}`);
    }
  };

  const editarCota = async (cotaEditada: Cota) => {
    try {
      const updateInput = {
        id: cotaEditada.id.toString(),
        numeroCota: cotaEditada.numeroCota,
        valor: cotaEditada.valor,
        status: cotaEditada.status,
        grupoId: cotaEditada.grupoId,
        clienteId: cotaEditada.clienteId || null
      };
      
      await dispatch(updateCota(updateInput) as any);
      setEditando(cotaVazia);
      setModalAberto(false);
      toast.success("Cota atualizada com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar cota");
    }
  };

  const deletarCotaAction = async () => {
    if (cotaParaDeletar) {
      try {
        await dispatch(removeCota(cotaParaDeletar.id.toString()) as any);
        
        setModalConfirmacaoAberto(false);
        setCotaParaDeletar(cotaVazia);
        
        toast.success("Cota excluída com sucesso!");
      } catch (err: any) {
        toast.error(`Erro ao excluir cota: ${err.message || "Erro desconhecido"}`);
      }
    }
  };

  const confirmarDeletarCota = (cota: Cota) => {
    setCotaParaDeletar(cota);
    setModalConfirmacaoAberto(true);
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
        <img src={starLogo} alt="Star Logo" className={styles.logo} />
        <div className={styles.headerContent}>
          <h1>Dashboard de Cotas</h1>
          <button 
            className={styles.addButton}
            onClick={() => {
              setEditando(cotaVazia);
              setModalAberto(true);
            }}
            disabled={isLoading}
          >
            Adicionar Cota
          </button>
        </div>
        
        <div className={styles.icon} onClick={handleLogout}>
          <IoMdExit color="red" size={30} />
        </div>
      </div>
      {isLoading && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          margin: '20px',
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px'
        }}>
          <p>Carregando cotas...</p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          margin: '20px',
          backgroundColor: '#f8d7da', 
          borderRadius: '8px', 
          color: '#721c24' 
        }}>
          <p>Erro ao carregar dados: {error}</p>
        </div>
      )}
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
          message={`Tem certeza que deseja excluir a cota ${cotaParaDeletar.numeroCota || cotaParaDeletar.numeroCota}?`}
          onConfirm={deletarCotaAction} 
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
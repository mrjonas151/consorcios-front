import { useState, useEffect } from "react";
import styles from "./CotasForm.module.css";
import { Cota, Grupo, Cliente } from "shared/types";
import { IoMdClose } from "react-icons/io";
import { gql } from "@apollo/client";
import { client } from "shared/apolloClient";
import { toast } from "react-toastify";

interface CotasFormProps {
  adicionarCota: (cota: Cota) => void;
  editarCota: (cota: Cota) => void;
  editando: Cota;
  fecharModal: () => void;
}

const STATUS_OPTIONS = [
  "DISPONIVEL",
  "RESERVADA",
  "VENDIDA",
  "CONTEMPLADA",
  "CANCELADA"
];

const GET_GRUPOS = gql`
  query {
    grupos {
      id
      nome
      administradoraId
    }
  }
`;

const GET_CLIENTES = gql`
  query {
    clientes {
      id
      nome
      cpf
      email
    }
  }
`;

const CotasForm = ({ adicionarCota, editarCota, editando, fecharModal }: CotasFormProps) => {
  const [cota, setCota] = useState<Omit<Cota, 'grupo'> & { grupo: Grupo }>(editando);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const gruposResult = await client.query({
          query: GET_GRUPOS,
          fetchPolicy: "network-only"
        });
        
        const clientesResult = await client.query({
          query: GET_CLIENTES,
          fetchPolicy: "network-only"
        });

        setGrupos(gruposResult.data?.grupos || []);
        setClientes(clientesResult.data?.clientes || []);
        
      } catch (err: any) {
        setError(err.message || "Erro ao carregar dados");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editando && editando.id !== 0) {
      setCota(editando);
    }
  }, [editando]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCota(prev => ({
      ...prev,
      [name]: name === 'valor' ? parseFloat(value) : value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "grupoId") {
      const grupoId = parseInt(value, 10);
      const grupo = grupos.find(g => g.id.toString() === value) || { id: 0, nome: "", administradoraId: 0 };
      setCota(prev => ({
        ...prev,
        grupoId,
        grupo
      }));
    } else if (name === "clienteId") {
      if (value === "0") {
        setCota(prev => ({
          ...prev,
          clienteId: undefined,
          cliente: undefined
        }));
      } else {
        const clienteId = parseInt(value, 10);
        const cliente = clientes.find(c => c.id.toString() === value);
        setCota(prev => ({
          ...prev,
          clienteId,
          cliente
        }));
      }
    } else if (name === "status") {
      setCota(prev => ({
        ...prev,
        status: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!cota.numeroCota || cota.numeroCota.trim() === "") {
        toast.error("Número da cota é obrigatório");
        return;
      }
      
      if (!cota.valor || isNaN(Number(cota.valor)) || Number(cota.valor) <= 0) {
        toast.error("Valor da cota deve ser maior que zero");
        return;
      }
      
      if (!cota.status) {
        toast.error("Status é obrigatório");
        return;
      }
      
      if (!cota.grupoId) {
        toast.error("Grupo é obrigatório");
        return;
      }
      
      const cotaInput = {
        numeroCota: cota.numeroCota.trim(), 
        valor: Number(cota.valor),
        status: cota.status,
        grupoId: Number(cota.grupoId),
        clienteId: cota.clienteId ? Number(cota.clienteId) : undefined
      };
            
      if (editando.id !== 0) {
        editarCota({
          ...cota,
          ...cotaInput
        });
      } else {
        adicionarCota({
          ...cota,
          ...cotaInput
        });
      }
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
      toast.error("Erro ao processar formulário");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Carregando dados...</h2>
            <button className={styles.closeButton} onClick={fecharModal}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Carregando grupos e clientes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Erro</h2>
            <button className={styles.closeButton} onClick={fecharModal}>
              <IoMdClose size={24} />
            </button>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
            <p>{error}</p>
            <button 
              onClick={fecharModal}
              style={{ 
                marginTop: '15px', 
                padding: '8px 16px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{editando.id !== 0 ? "Editar Cota" : "Adicionar Cota"}</h2>
          <button className={styles.closeButton} onClick={fecharModal}>
            <IoMdClose size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>          
          <div className={styles.formGroup}>
            <label htmlFor="numeroCota">Número da Cota:</label>
            <input 
              type="text" 
              id="numeroCota"
              name="numeroCota" 
              value={cota.numeroCota} 
              onChange={handleInputChange} 
              placeholder="Ex: 001-B, 002, etc."
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="valor">Valor (R$):</label>
            <input 
              type="number" 
              id="valor"
              name="valor" 
              value={cota.valor} 
              onChange={handleInputChange} 
              min="0"
              step="0.01"
              placeholder="0,00"
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={cota.status}
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>Selecione um status</option>
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="grupoId">Grupo:</label>
            <select
              id="grupoId"
              name="grupoId"
              value={cota.grupoId?.toString() || ''}
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>Selecione um grupo</option>
              {grupos.map(grupo => (
                <option key={grupo.id.toString()} value={grupo.id.toString()}>
                  {grupo.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="clienteId">Cliente (opcional):</label>
            <select
              id="clienteId"
              name="clienteId"
              value={cota.clienteId?.toString() || '0'}
              onChange={handleSelectChange}
            >
              <option value="0">Nenhum</option>
              {clientes.map(cliente => (
                <option key={cliente.id.toString()} value={cliente.id.toString()}>
                  {cliente.nome} - {cliente.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.modalActions}>
            <button type="submit" className={styles.submitButton}>
              {editando.id !== 0 ? "Salvar" : "Adicionar"}
            </button>
            <button 
              type="button" 
              onClick={fecharModal}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CotasForm;
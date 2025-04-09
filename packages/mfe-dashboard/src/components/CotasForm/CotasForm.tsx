import { useState, useEffect } from "react";
import styles from "./CotasForm.module.css";
import { Cota, Grupo, Cliente } from "shared/types";
import { IoMdClose } from "react-icons/io";

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

const CotasForm = ({ adicionarCota, editarCota, editando, fecharModal }: CotasFormProps) => {
  const [cota, setCota] = useState<Omit<Cota, 'grupo'> & { grupo: Grupo }>(editando || { 
    id: 0, 
    nome: "", 
    valor: 0,
    numeroCota: "",
    status: "",
    grupoId: 0,
    grupo: {id: 0, nome: "", administradoraId: 0}
  });

  const gruposIniciais: Grupo[] = [
    { id: 1, nome: "Grupo 1", administradoraId: 1 },
    { id: 2, nome: "Grupo 2", administradoraId: 1 },
    { id: 3, nome: "Grupo 3", administradoraId: 2 }
  ];

  const clientesIniciais: Cliente[] = [
    { id: 1, nome: "Cliente 1", cpf: "123.456.789-00", email: "cliente1@exemplo.com" },
    { id: 2, nome: "Cliente 2", cpf: "987.654.321-00", email: "cliente2@exemplo.com" },
    { id: 3, nome: "Cliente 3", cpf: "111.222.333-44", email: "cliente3@exemplo.com" },
    { id: 4, nome: "Cliente 4", cpf: "555.666.777-88", email: "teste@gmail.com" }
  ];

  const [grupos, setGrupos] = useState<Grupo[]>(gruposIniciais);
  
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciais);

  useEffect(() => {
    if (editando) {
      setCota(editando);
    }
  }, [editando]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCota(prev => ({
      ...prev,
      [name]: name === 'valor' ? Number(value) : value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "grupoId") {
      const grupoId = parseInt(value);
      const grupo = grupos.find(g => g.id === grupoId) || { id: 0, nome: "", administradoraId: 0 };
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
        const clienteId = parseInt(value);
        const cliente = clientes.find(c => c.id === clienteId);
        setCota(prev => ({
          ...prev,
          clienteId,
          cliente: cliente || undefined
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
    if (editando.id !== 0) {
      editarCota(cota);
    } else {
      adicionarCota(cota);
    }
    
    setCota({ 
      id: 0, 
      nome: "", 
      valor: 0,
      numeroCota: "",
      status: "",
      grupoId: 0,
      grupo: {id: 0, nome: "", administradoraId: 0}
    });
    
    fecharModal();
  };

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
            <label htmlFor="nome">Nome da Cota:</label>
            <input 
              type="text" 
              id="nome"
              name="nome" 
              value={cota.nome} 
              onChange={handleInputChange} 
              placeholder="Digite o nome da cota"
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="numeroCota">Número da Cota:</label>
            <input 
              type="text" 
              id="numeroCota"
              name="numeroCota" 
              value={cota.numeroCota} 
              onChange={handleInputChange} 
              placeholder="Ex: 001, 002, etc."
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
              value={cota.grupoId || ""}
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>Selecione um grupo</option>
              {grupos.map(grupo => (
                <option key={grupo.id} value={grupo.id}>
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
              value={cota.clienteId || 0}
              onChange={handleSelectChange}
            >
              <option value={0}>Nenhum</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
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
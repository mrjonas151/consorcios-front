import { useState, useEffect } from "react";
import styles from "./CotasForm.module.css";
import { Cota, Grupo } from "../../types/ConsorcioTypes";

interface CotasFormProps {
  adicionarCota: (cota: Cota) => void;
  editarCota: (cota: Cota) => void;
  editando: Cota;
  fecharModal: () => void;
}

const CotasForm = ({ adicionarCota, editarCota, editando, fecharModal }: CotasFormProps) => {
  const [cota, setCota] = useState<Omit<Cota, 'grupo'> & { grupo: Grupo }>({ 
    id: 0, 
    nome: "", 
    valor: 0,
    numeroCota: "",
    status: "",
    grupoId: 0,
    grupo: {id: 0, nome: "", administradoraId: 0}
  });
  useEffect(() => {
    if (editando) {
      setCota(editando);
    }
  }, [editando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCota(prev => ({
      ...prev,
      [name]: name === 'valor' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editando) {
      if (cota.grupo) {
        editarCota({...cota, grupo: cota.grupo});
      } else {
        console.error("Grupo is required");
        return;
      }
    } else {
      if (cota.grupo) {
        adicionarCota({...cota, grupo: cota.grupo});
      } else {
        console.error("Grupo is required");
        return;
      }
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
        <h2>{editando ? "Editar Cota" : "Adicionar Cota"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input type="text" name="nome" value={cota.nome} onChange={handleChange} required />

          <label>Valor:</label>
          <input type="number" name="valor" value={cota.valor} onChange={handleChange} required />

          <div className={styles.modalActions}>
            <button type="submit">{editando ? "Salvar" : "Adicionar"}</button>
            <button type="button" onClick={fecharModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CotasForm;
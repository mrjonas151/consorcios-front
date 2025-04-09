import styles from "./CotasList.module.css";
import { Cota } from "shared/types";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface CotasListProps {
  cotas: Cota[];
  setEditando: (cota: Cota) => void;
  deletarCota: (cota: Cota) => void;
  verDetalhesCota: (cota: Cota) => void;
}

const CotasList = ({ cotas, setEditando, deletarCota, verDetalhesCota }: CotasListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleCotaClick = (cota: Cota) => {
    if (verDetalhesCota) {
      verDetalhesCota(cota);
    }
  };

  const filteredCotas = cotas.filter(cota => {
    if (!searchTerm.trim()) return true;
    
    const termLower = searchTerm.toLowerCase().trim();

    return (
      (cota.nome?.toLowerCase().includes(termLower)) ||
      cota.numeroCota.toLowerCase().includes(termLower) ||
      formatCurrency(cota.valor).toLowerCase().includes(termLower) ||
      cota.status.toLowerCase().includes(termLower) ||
      (cota.grupo?.nome.toLowerCase().includes(termLower)) ||
      (cota.cliente?.nome.toLowerCase().includes(termLower)) ||
      (cota.cliente?.cpf.toLowerCase().includes(termLower))
    );
  });

return (
    <div className={styles.listaCotas}>
      <div className={styles.listaCotasHeader}>
        <h2>Lista de Cotas</h2>
        <div className={styles.inputGroup}>
          <input 
            placeholder="Buscar cota..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className={styles.icon} color="gray" size={22}/>
        </div>
      </div>
      {filteredCotas.length === 0 ? (
        <p className={styles.emptyMessage}>
          {searchTerm ? "Nenhuma cota encontrada para sua busca." : "Nenhuma cota cadastrada."}
        </p>
      ) : (
        <ul>
          {filteredCotas.map((cota) => (
            <li 
              key={cota.id} 
              className={styles.cotaItem}
              onClick={() => handleCotaClick(cota)}
            >
              <div className={styles.cotaInfo}>
                <h3>Cota {cota.numeroCota}</h3>
                <div className={styles.cotaDetails}>
                  <p><strong>Valor:</strong> {formatCurrency(cota.valor)}</p>
                  <p><strong>Status:</strong> <span className={styles[cota.status.toLowerCase()]}>{cota.status}</span></p>
                  <p><strong>Grupo:</strong> {cota.grupo?.nome || "N/A"}</p>
                  <p><strong>Cliente:</strong> {cota.cliente?.nome || "Sem cliente"}</p>
                </div>
              </div>
              <div className={styles.cotaActions} onClick={(e) => e.stopPropagation()}>
                <button 
                  className={styles.editButton}
                  onClick={() => setEditando(cota)}
                >
                  Editar
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => deletarCota(cota)}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CotasList;

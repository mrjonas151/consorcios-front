import styles from "./CotasList.module.css";
import { Cota } from "../../types/ConsorcioTypes";
import { FaSearch } from "react-icons/fa";

interface CotasListProps {
  cotas: Cota[];
  setEditando: (cota: Cota) => void;
  deletarCota: (id: number) => void;
}

const CotasList = ({ cotas, setEditando, deletarCota }: CotasListProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className={styles.listaCotas}>
      <div className={styles.listaCotasHeader}>
        <h2>Lista de Cotas</h2>
        <div className={styles.inputGroup}>
          <input />
          <FaSearch className={styles.icon} color="gray" size={22}/>
        </div>
        
      </div>
      
      
      {cotas.length === 0 ? (
        <p className={styles.emptyMessage}>Nenhuma cota encontrada.</p>
      ) : (
        <ul>
          {cotas.map((cota) => (
            <li key={cota.id} className={styles.cotaItem}>
              <div className={styles.cotaInfo}>
                <h3>Cota {cota.numeroCota}</h3>
                <div className={styles.cotaDetails}>
                  <p><strong>Valor:</strong> {formatCurrency(cota.valor)}</p>
                  <p><strong>Status:</strong> <span className={styles[cota.status]}>{cota.status}</span></p>
                  <p><strong>Grupo:</strong> {cota.grupo?.nome || "N/A"}</p>
                  <p><strong>Cliente:</strong> {cota.cliente?.nome || "Sem cliente"}</p>
                </div>
              </div>
              <div className={styles.cotaActions}>
                <button 
                  className={styles.editButton}
                  onClick={() => setEditando(cota)}
                >
                  Editar
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => deletarCota(cota.id)}
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
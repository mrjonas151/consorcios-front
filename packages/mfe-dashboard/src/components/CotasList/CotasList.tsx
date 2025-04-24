import styles from "./CotasList.module.css";
import { Cota } from "shared/types";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

interface CotasListProps {
  cotas: Cota[];
  setEditando: (cota: Cota) => void;
  deletarCota: (cota: Cota) => void;
  verDetalhesCota: (cota: Cota) => void;
}

const CotasList = ({ cotas, setEditando, deletarCota, verDetalhesCota }: CotasListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [processedCotas, setProcessedCotas] = useState<Cota[]>([]);
  
  useEffect(() => {
    
    const processed = cotas.map(cota => {
      let grupo = cota.grupo;
      if (!grupo || (typeof grupo === 'object' && !grupo.nome)) {
        if (cota.grupoId) {
          const matchingCota = cotas.find(c => 
            c.grupoId === cota.grupoId && 
            c.grupo && 
            typeof c.grupo === 'object' && 
            c.grupo.nome
          );
          
          if (matchingCota && matchingCota.grupo) {
            grupo = matchingCota.grupo;
          } else {
            grupo = { id: cota.grupoId, nome: `Grupo ${cota.grupoId}`, administradoraId: 0 };
          }
        }
      }
      
      let cliente = cota.cliente;
      if (!cliente && cota.clienteId) {
        const matchingCota = cotas.find(c => 
          c.clienteId === cota.clienteId && 
          c.cliente && 
          typeof c.cliente === 'object' && 
          c.cliente.nome
        );
        
        if (matchingCota && matchingCota.cliente) {
          cliente = matchingCota.cliente;
        } else if (cota.clienteId) {
          cliente = { 
            id: cota.clienteId, 
            nome: `Cliente ${cota.clienteId}`, 
            cpf: "Não disponível",
            email: "email@naodisponivel.com"
          };
        }
      }
      
      return {
        ...cota,
        grupo,
        cliente
      };
    });
    
    setProcessedCotas(processed);
  }, [cotas]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleCotaClick = (cota: Cota) => {
    verDetalhesCota(cota);
  };

  const filteredCotas = processedCotas.filter(cota => {
    if (!searchTerm.trim()) return true;
    
    const termLower = searchTerm.toLowerCase().trim();

    return (
      (cota.numeroCota?.toLowerCase().includes(termLower)) ||
      formatCurrency(cota.valor).toLowerCase().includes(termLower) ||
      cota.status.toLowerCase().includes(termLower) ||
      (cota.grupo?.nome?.toLowerCase().includes(termLower)) ||
      (cota.cliente?.nome?.toLowerCase().includes(termLower)) ||
      (cota.cliente?.cpf?.toLowerCase().includes(termLower))
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
import { Cota } from "shared/types";
import styles from "./CotaDetails.module.css";
import { IoMdClose } from "react-icons/io";

interface CotaDetailsProps {
  cota: Cota;
  fecharModal: () => void;
}

const CotaDetails: React.FC<CotaDetailsProps> = ({ cota, fecharModal }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Detalhes da Cota</h2>
          <button className={styles.closeButton} onClick={fecharModal}>
            <IoMdClose size={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.section}>
            <h3>Informações da Cota</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>ID:</span>
                <span className={styles.value}>{cota.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Número:</span>
                <span className={styles.value}>{cota.numeroCota}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Valor:</span>
                <span className={styles.value}>{formatCurrency(cota.valor)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Status:</span>
                <span className={`${styles.value} ${styles[cota.status.toLowerCase()]}`}>
                  {cota.status}
                </span>
              </div>
              {cota.numeroCota && (
                <div className={styles.infoItem}>
                  <span className={styles.label}>Nome:</span>
                  <span className={styles.value}>{cota.numeroCota}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h3>Informações do Grupo</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>ID do Grupo:</span>
                <span className={styles.value}>{cota.grupoId}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Nome do Grupo:</span>
                <span className={styles.value}>{cota.grupo.nome}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>ID da Administradora:</span>
                <span className={styles.value}>{cota.grupo.administradoraId}</span>
              </div>
            </div>
          </div>

          {cota.cliente && (
            <div className={styles.section}>
              <h3>Informações do Cliente</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>ID do Cliente:</span>
                  <span className={styles.value}>{cota.cliente.id}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Nome:</span>
                  <span className={styles.value}>{cota.cliente.nome}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>CPF:</span>
                  <span className={styles.value}>{cota.cliente.cpf}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{cota.cliente.email || "Não informado"}</span>
                </div>
              </div>
            </div>
          )}

          {!cota.cliente && (
            <div className={styles.section}>
              <h3>Informações do Cliente</h3>
              <p className={styles.noClient}>Esta cota não possui cliente associado.</p>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.closeBtn} onClick={fecharModal}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CotaDetails;
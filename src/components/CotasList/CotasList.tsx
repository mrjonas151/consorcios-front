import styles from "./CotasList.module.css";

const CotasList = ({ cotas, setEditando, deletarCota }) => {
  return (
    <div className={styles.listaCotas}>
      <h2>Lista de Cotas</h2>
      <ul>
        {cotas.map((cota) => (
          <li key={cota.id} className={styles.cotaItem}>
            <span>{cota.nome} - R$ {cota.valor}</span>
            <div>
              <button onClick={() => setEditando(cota)}>Editar</button>
              <button onClick={() => deletarCota(cota.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CotasList;
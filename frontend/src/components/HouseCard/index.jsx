import styles from './HouseCard.module.css';

const HouseCard = ({ house, isSelected, onClick }) => {
    if (!house) {
        return null;
    }

    const { name, number, complement, status, user, address } = house;
    const cardClassName = `${isSelected ? styles.selected : ''}`;

    return (
        <div className={cardClassName} onClick={onClick}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.houseName}>{name}</h3>
                    {   status && isSelected
                            ? <span className={`${styles.statusBadge} ${styles.statusBadgeSelected}`}>Selecionado</span> 
                        : status
                            ? <span className={`${styles.statusBadge} ${styles.statusBadgeActive}`}>Ativado</span>
                            : <span className={`${styles.statusBadge} ${styles.statusBadgeInactive}`}>Desativado</span>
                    }
                </div>

                <div className={styles.cardBody}>
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>📍 Endereço</h4>
                        <p>
                            {address.name}, {number} {complement && `- ${complement}`}
                            <br />
                            {address.locality} - {address.state}, {address.cep}
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>👤 Proprietário</h4>
                        <p>
                            {user.name}
                            <br />
                            <span className={styles.userEmail}>{user.email}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;
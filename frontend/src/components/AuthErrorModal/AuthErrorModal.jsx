import * as styles from "./AuthErrorModal.module.css"

const AuthErrorModal = ({ onClose, title, warning, buttonText }) => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <div className={styles.warning}>
                        <p>{warning}</p>
                        <button onClick={onClose}>{buttonText}</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AuthErrorModal;
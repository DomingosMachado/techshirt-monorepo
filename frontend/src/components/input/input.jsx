import styles from "./input.module.css"

export function Input({type,value,onChange, placeholder}){
    return(
        <input 
            className={styles.input}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder} 
        />
    )
}
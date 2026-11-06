import { useTheme } from "../../../../../contexts/themeContext";
import { IoSunny, IoMoon } from "react-icons/io5";
import styles from "./themeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeButton}
      onClick={toggleTheme}
      aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
      title={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
    >
      {theme === "light" ? <IoSunny /> : <IoMoon />}
    </button>
  );
}

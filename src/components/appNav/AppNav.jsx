import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

export const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to="cities">Cities</NavLink>
        <NavLink to="countries">Countries</NavLink>
      </ul>
    </nav>
  );
};

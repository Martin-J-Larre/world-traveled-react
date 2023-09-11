import { Outlet } from "react-router-dom";
import { AppNav } from "../appNav/AppNav";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;

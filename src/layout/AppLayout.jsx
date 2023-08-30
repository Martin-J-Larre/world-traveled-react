import Map from "../components/map/Map";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

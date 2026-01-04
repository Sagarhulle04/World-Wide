import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import { Map } from "../components/Map";

const AppLayout = () => {
  return (
    <div>
      <h1 className={styles.app}>
        <Sidebar />
        <Map />
      </h1>
    </div>
  );
};

export default AppLayout;

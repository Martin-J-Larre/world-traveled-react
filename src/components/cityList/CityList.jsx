import styles from "./CityList.module.css";
import Spinner from "../spinner/Spinner";
import CityItem from "../cityItem/CityItem";
import Message from "../message/Message";
import { useCities } from "../../context/CitiesContext";

const CityList = () => {
  const { data, loading } = useCities();
  if (loading) return <Spinner />;
  if (!data.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {data.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;

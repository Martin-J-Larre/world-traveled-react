import styles from "./CountryList.module.css";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import CountryItem from "../countryItem/CountryItem";
import { useCities } from "../../context/CitiesContext";

const CountriesList = () => {
  const { data, loading } = useCities();
  if (loading) return <Spinner />;
  if (!data.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = data.reduce((arr, curr) => {
    if (!arr.map((el) => el.country).includes(curr.country)) {
      return [...arr, { country: curr.country, emoji: curr.emoji }];
    } else {
      return arr;
    }
  }, []);
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem
          country={country}
          key={country.country + Math.trunc(Math.random() * 10000)}
        />
      ))}
    </ul>
  );
};

export default CountriesList;

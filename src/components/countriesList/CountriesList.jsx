import styles from "./CountryList.module.css";
import Message from "../Message";
import Spinner from "../spinner/Spinner";
import CountryItem from "../countryItem/CountryItem";

const CountriesList = ({ data, loading }) => {
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
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
};

export default CountriesList;

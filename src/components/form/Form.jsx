import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUrlPosition } from "../../hooks/useUrlPosition";
import Button from "../button/Button";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./Form.module.css";
import { useCities } from "../../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [cityMapError, setCityMapError] = useState("");

  const { createCity, loading } = useCities();

  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (!lat && !lng) return;
    const fetchCityMap = async () => {
      try {
        setLoadingForm(true);
        setCityMapError("");
        const resp = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await resp.json();
        if (!data.countryCode) {
          throw new Error(
            " That doesn't seen to be a city. Click somewhere else"
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setCityMapError(error.message);
      } finally {
        setLoadingForm(false);
      }
    };
    fetchCityMap();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  };

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (loadingForm) return <Spinner />;

  if (cityMapError) return <Message message={cityMapError} />;

  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;

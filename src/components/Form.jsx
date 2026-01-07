// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../context/CitiesContext";
import DatePicker from "react-datepicker";

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
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("");

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  const { createCity, isLoading } = useCities();

  const BASE_URL = "/bdc/data/reverse-geocode-client?";

  useEffect(() => {
    async function fetchData() {
      if (!lat && !lng) return;
      setGeocodingError("");
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error("Click on the country its invalid");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        console.log(data);
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchData();
  }, [lat, lng]);

  function handleSubmitForm(e) {
    e.preventDefault();
    const city = {
      cityName,
      notes,
      date,
      emoji,
      country,
      position: { lat, lng },
    };

    createCity(city);
    navigate("/app");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Select the city on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmitForm}
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
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
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
        <Button htmlType="submit" type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

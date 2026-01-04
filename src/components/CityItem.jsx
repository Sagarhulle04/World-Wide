import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ data }) => {
  const { currentCity } = useCities();

  const { emoji, cityName, date, id, position } = data;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}> {emoji} </span>
        <h3 className={styles.name}> {cityName} </h3>
        <time className={styles.date}> ({formatDate(date)}) </time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;

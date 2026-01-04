import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

const CityList = () => {
  const { cities, isLoading } = useCities();

  console.log(cities);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the first map" />
    );

  return (
    <ul className={styles.cityItem}>
      {cities.map((data) => (
        <CityItem data={data} key={data.id} />
      ))}
    </ul>
  );
};

export default CityList;

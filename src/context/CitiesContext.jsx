import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const initalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((cities) => cities.id !== action.payload),
      };

    default:
      throw new Error("action type is invalid");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data",
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CityContext was used outside the CityProvider");
  return context;
}

export { useCities, CitiesProvider };

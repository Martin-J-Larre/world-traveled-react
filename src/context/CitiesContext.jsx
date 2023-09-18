import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialSate = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: action.payload };
    case "cities/loaded":
      return { ...state, cities: action.payload };
    case "city/loaded":
      return { ...state, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, loading: false, eror: action.payload };

    default:
      throw new Error("Something is wrong in the reducer");
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, loading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialSate
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "loading", payload: true });
        const resp = await fetch("http://localhost:8000/cities");
        const data = await resp.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: " There was am error loading data...",
        });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };
    fetchData();
  }, []);

  const getCity = async (id) => {
    if (+id === currentCity.id) return;
    try {
      dispatch({ type: "loading", payload: true });
      const resp = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await resp.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: " There was am error loading data...",
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const createCity = async (newCity) => {
    try {
      dispatch({ type: "loading", payload: true });
      const resp = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const city = await resp.json();
      dispatch({ type: "city/created", payload: city });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: " There was am error deleting city...",
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading", payload: true });
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities is called outside the citiesProvider");
  }
  return context;
};
export { CitiesProvider, useCities };

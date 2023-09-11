import { useState, useEffect, createContext, useContext } from "react";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await fetch("http://localhost:8000/cities");
        const data = await resp.json();
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCity = async (id) => {
    try {
      setLoading(true);
      const resp = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await resp.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ data, loading, currentCity, getCity }}>
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import { NoFoundPage } from "./pages/NoFoundPage";
import { AppLayout } from "./layout/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/cityList/CityList";
import { useEffect, useState } from "react";
import CountriesList from "./components/countriesList/CountriesList";
import City from "./components/city/City";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList data={data} loading={loading} />} />
          <Route
            path="cities"
            element={<CityList data={data} loading={loading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountriesList data={data} loading={loading} />}
          />
          <Route path="form" element={<p>Form of data</p>} />
        </Route>
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

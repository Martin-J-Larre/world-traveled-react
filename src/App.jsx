import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import { NoFoundPage } from "./pages/NoFoundPage";
import { AppLayout } from "./layout/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/cityList/CityList";
import CountriesList from "./components/countriesList/CountriesList";
import City from "./components/city/City";
import Form from "./components/form/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/fakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="pricing" element={<Pricing />} />

            <Route
              path="app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="*" element={<NoFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./pages/Product";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { NoFoundPage } from "./pages/NoFoundPage";
import { AppLayout } from "./pages/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

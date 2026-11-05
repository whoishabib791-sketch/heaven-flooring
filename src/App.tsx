import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteShell } from "./components/layout/SiteShell";
import { AboutPage } from "./pages/AboutPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ComparePage } from "./pages/ComparePage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { FindFloorPage } from "./pages/FindFloorPage";
import { FlooringPage } from "./pages/FlooringPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductPage } from "./pages/ProductPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { QuotePage } from "./pages/QuotePage";
import { ServicesPage } from "./pages/ServicesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route path="flooring" element={<FlooringPage />} />
          <Route path="flooring/:category" element={<CategoryPage />} />
          <Route path="products" element={<Navigate to="/flooring" replace />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="find-your-floor" element={<FindFloorPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

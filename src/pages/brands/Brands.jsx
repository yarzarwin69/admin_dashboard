import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandList from "./BrandList";
import BrandForm from "./BrandForm";
import BrandDetails from "./BrandDetails";

const Brands = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<BrandList />} />
        <Route path="new" element={<BrandForm />} />
        <Route path="edit/:id" element={<BrandForm />} />
        <Route path=":id" element={<BrandDetails />} />
      </Routes>
    </div>
  );
};

export default Brands;

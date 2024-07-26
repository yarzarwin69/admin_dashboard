import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductDetails from './ProductDetails';

const Product = () => {
  return (
      <div className="p-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="new" element={<ProductForm />} />
          <Route path="edit/:id" element={<ProductForm />} />
          <Route path=":id" element={<ProductDetails />} />
        </Routes>
      </div>
  );
};

export default Product;

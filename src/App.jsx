import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Nav from './components/nav';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import CategoryForm from './pages/categories/categoryform';
import CategoryList from './pages/categories/categories';
import CatDetails from './pages/categories/catDetails';
import SeeMorePage from './pages/subcategories/subDetails';
import SubcategoriesPage from './pages/subcategories/subcategories';
import SubcategoryForm from './pages/subcategories/SubcategoryForm ';
import AddSubcategoryForm from './pages/subcategories/addcategoryform';

import './style.css';

const App = () => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Category 1', subcategories: [] },
    { id: '2', name: 'Category 2', subcategories: [] },
  ]);

  const handleSubcategoryAdded = (categoryId, newSubcategory) => {
    console.log('Subcategory added:', newSubcategory); // Debugging line

    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId
          ? { ...category, subcategories: [...category.subcategories, newSubcategory] }
          : category
      )
    );
  };

  const CategoryWithAddSubcategoryForm = () => {
    const { categoryId } = useParams();
    return (
      <>
        <CategoryList categories={categories} /> {/* Display list of categories */}
        <AddSubcategoryForm categoryId={categoryId} onSubcategoryAdded={handleSubcategoryAdded} />
      </>
    );
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <Nav />
          <main className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/categories" element={<CategoryList categories={categories} />} />
              <Route path="/add-category" element={<CategoryForm />} />
              <Route path="/edit-category/:id" element={<CategoryForm />} />
              <Route path="/catDetails/:categoryId" element={<CatDetails />} />
              <Route path="/subcategories" element={<SubcategoriesPage />} />
              <Route path="/categories/:categoryId/subcategories" element={<SeeMorePage />} />
              <Route path="/categories/:categoryId/add-subcategory" element={<CategoryWithAddSubcategoryForm />} />
              <Route path="/categories/:categoryId/edit-subcategory/:subCategoryId" element={<SubcategoryForm />} />
              {/* Redirect from root to dashboard */}
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubCategoryList from './SubCategoryList';
import SubCategoryForm from './SubCategoryForm';
import SubCategoryDetails from './SubCategoryDetails';

const SubCategory = () => {
  return (
      <div className="p-4">
        <Routes>
          <Route path="/" element={<SubCategoryList />} />
          <Route path="new" element={<SubCategoryForm />} />
          <Route path="edit/:id" element={<SubCategoryForm />} />
          <Route path=":id" element={<SubCategoryDetails />} />
        </Routes>
      </div>
  );
};

export default SubCategory;

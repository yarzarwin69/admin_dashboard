import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    if (id) {
      fetch(`http://localhost:3001/categories`)
        .then(response => response.json())
        .then(data => {
          const category = data.find(category => category.subcategories.some(sub => sub.id === parseInt(id)));
          if (category) {
            const subcategory = category.subcategories.find(sub => sub.id === parseInt(id));
            setName(subcategory.name);
            setDescription(subcategory.description);
            setImageUrl(subcategory.image_url);
            setCategoryId(category.id);
          }
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const subcategoryData = {
      id: id ? parseInt(id) : Date.now(),
      name,
      description,
      image_url
    };

    const selectedCategory = categories.find(category => category.id == category_id);
    const updatedSubcategories = id
      ? selectedCategory.subcategories.map(sub => (sub.id == id ? subcategoryData : sub))
      : [...selectedCategory.subcategories, subcategoryData];

    const updatedCategory = { ...selectedCategory, subcategories: updatedSubcategories };

    fetch(`http://localhost:3001/categories/${category_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory)
    }).then(() => navigate('/subcategories'));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{id ? 'Edit' : 'Add'} Subcategory</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subcategory Name"
          className="p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 border rounded"
          required
        ></textarea>
        <input
          type="url"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="p-2 border rounded"
          required
        />
        <select
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.id} - {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {id ? 'Update' : 'Add'} Subcategory
        </button>
      </form>
    </div>
  );
};

export default SubCategoryForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/categories/${id}`)
        .then(response => response.json())
        .then(data => {
          setName(data.name);
          setDescription(data.description);
          setImageUrl(data.image_url);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3001/categories/${id}` : 'http://localhost:3001/categories';

    const categoryData = {
      name,
      description,
      image_url
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    }).then(() => navigate('/categories'));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{id ? 'Edit' : 'Add'} Category</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {id ? 'Update' : 'Add'} Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;

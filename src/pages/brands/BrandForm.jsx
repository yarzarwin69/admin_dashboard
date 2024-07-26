import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BrandForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/brands/${id}`)
        .then(response => response.json())
        .then(data => {
          setName(data.name);
          setDescription(data.description);
          setLogoUrl(data.logo_url);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3001/brands/${id}` : 'http://localhost:3001/brands';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, logo_url: logoUrl })
    }).then(() => navigate('/brands'));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{id ? 'Edit' : 'Add'} Brand</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Brand Name"
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
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="Logo URL"
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {id ? 'Update' : 'Add'} Brand
        </button>
      </form>
    </div>
  );
};

export default BrandForm;

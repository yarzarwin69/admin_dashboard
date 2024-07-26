import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [subcategory_id, setSubcategoryId] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [discount, setDiscount] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    if (id) {
      fetch(`http://localhost:3001/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setBrand(data.brand);
          setCategoryId(data.category_id);
          setSubcategoryId(data.subcategory_id);
          setImageUrl(data.image_url);
          setSizes(data.sizes ? data.sizes.join(', ') : '');
          setColors(data.colors ? data.colors.map(color => `${color.name}:${color.code}`).join(', ') : '');
          setDiscount(data.discount);
        });
    }
  }, [id]);

  useEffect(() => {
    if (category_id) {
      console.log(category_id);
      console.log(categories);
      const selectedCategory = categories.find(category => category.id == category_id);
      console.log(selectedCategory);
      setFilteredSubcategories(selectedCategory ? selectedCategory.subcategories : []);
    } else {
      setFilteredSubcategories([]);
    }
  }, [category_id, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3001/products/${id}` : 'http://localhost:3001/products';

    const productData = {
      name,
      description,
      price: parseFloat(price),
      brand,
      category_id: parseInt(category_id),
      subcategory_id: parseInt(subcategory_id),
      image_url,
      sizes: sizes ? sizes.split(',').map(size => size.trim()) : [],
      colors: colors ? colors.split(',').map(color => {
        const [name, code] = color.split(':');
        return { name: name.trim(), code: code.trim() };
      }) : [],
      discount: discount ? parseFloat(discount) : null
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    }).then(() => navigate('/products'));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{id ? 'Edit' : 'Add'} Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
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
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
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
        <select
          value={subcategory_id}
          onChange={(e) => setSubcategoryId(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.id} - {subcategory.name}
            </option>
          ))}
        </select>
        <input
          type="url"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          placeholder="Sizes (comma-separated)"
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          placeholder="Colors (format: name:code, comma-separated)"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Discount"
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {id ? 'Update' : 'Add'} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

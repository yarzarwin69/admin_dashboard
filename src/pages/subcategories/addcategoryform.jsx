import React, { useState } from 'react';

const AddSubcategoryForm = ({onSubcategoryAdded }) => {
  const [newSubcategory, setNewSubcategory] = useState({
    id: '', 
    name: '',
    description: '',
    image_url: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubcategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    if (!newSubcategory.name || !newSubcategory.description || !newSubcategory.image_url) {
      setError('All fields are required.');
      return;
    }

    // Generate a unique ID for the new subcategory
    const newSubcategoryWithId = {
      ...newSubcategory,
      id: Date.now().toString()
    };

    // Debugging line
    console.log('Submitting subcategory:', newSubcategoryWithId);

    // Call the parent component's handler to add the subcategory
    onSubcategoryAdded(newSubcategoryWithId);
    
    // Reset the form
    setNewSubcategory({
      id: '',
      name: '',
      description: '',
      image_url: ''
    });
    setError(null);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Subcategory</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newSubcategory.name}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newSubcategory.description}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={newSubcategory.image_url}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          {newSubcategory.image_url && (
            <img 
              src={newSubcategory.image_url} 
              alt="Preview" 
              className="mt-2 w-32 h-32 object-cover rounded-md border border-gray-300"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Subcategory
        </button>
      </form>
    </div>
  );
};

export default AddSubcategoryForm;

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
	
  const backendUrl = 'http://ad7e825b70b1a4653852d0397191be98-1760399707.us-east-1.elb.amazonaws.com:4000';

  // Fetch items from backend
  const fetchItems = () => {
    fetch(`${backendUrl}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const handleAddItem = () => {
    if (!name || !quantity) {
      alert("Both fields are required!");
      return;
    }

    fetch(`${backendUrl}/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, quantity })
    })
      .then((res) => res.json())
      .then(() => {
        setName('');
        setQuantity('');
        fetchItems(); // Refresh the list
      })
      .catch((err) => console.error('Error adding item:', err));
  };

  return (
    <div className="App">
      <h1>Inventory Items</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;


"use client";

import { useEffect, useState } from "react";
import ItemForm from "./ItemForm";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data);
  };

  const handleAddOrUpdateItem = async (item) => {
    const method = selectedItem ? "PUT" : "POST";
    await fetch(`/api/items`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    fetchItems();
    setMessage(`Item ${selectedItem ? "updated" : "added"} successfully!`);
    setSelectedItem(null);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
  };

  const handleDeleteItem = async () => {
    if (selectedItem) {
      await fetch(`/api/items`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedItem.id }),
      });
      fetchItems();
      setMessage("Item deleted successfully!");
      setSelectedItem(null);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div>
      <h1>Items</h1>
      {message && <div className="notification">{message}</div>}
      <ItemForm
        item={selectedItem}
        onSubmit={handleAddOrUpdateItem}
        onDelete={handleDeleteItem}
      />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} (Quantity: {item.quantity}) - {item.description}
            <button onClick={() => handleEditItem(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;

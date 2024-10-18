
"use client"; // Make sure this is a client component

import { useState, useEffect } from "react";

const ItemForm = ({ item, onSubmit, onDelete }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setDescription(item.description);
    } else {
      setName("");
      setQuantity("");
      setDescription("");
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: item ? item.id : Date.now(), name, quantity, description });

    // Clear the form after submission
    setName("");
    setQuantity("");
    setDescription("");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">{item ? "Update Item" : "Add Item"}</button>
      {item && (
        <button type="button" onClick={handleDelete} className="delete-button">
          Delete Item
        </button>
      )}
    </form>
  );
};

export default ItemForm;

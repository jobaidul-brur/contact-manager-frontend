// src/pages/AddContact.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddContact: React.FC = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/contacts/", contact)
      .then((response) => {
        // Handle success
        // For example, navigate to contact details after successful creation
        // navigate(`/contacts/${response.data.id}`);
        // Clear the form after successful creation
        setContact({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      })
      .catch((error) => {
        console.error("Error creating contact:", error);
      });
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={contact.address}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
      <Link to="/">Back to Contact List</Link>
    </div>
  );
};

export default AddContact;

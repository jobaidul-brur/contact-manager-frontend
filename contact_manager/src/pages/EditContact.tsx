// src/pages/EditContact.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    axios
      .get<Contact>(`http://localhost:8000/api/contacts/${id}`)
      .then((response) => {
        setContact(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact details:", error);
      });
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact!,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/api/contacts/${id}`, contact)
      .then((response) => {
        // Handle success
        // For example, navigate to contact details after successful update
        navigate(`/contacts/${id}`);
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Contact</h2>
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
        <button type="submit">Update Contact</button>
        <br />
        <Link to={`/contacts/${id}`}>Back to Contact Details</Link>
      </form>
    </div>
  );
};

export default EditContact;

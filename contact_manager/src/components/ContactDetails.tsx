// src/components/ContactDetails.tsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/contacts/${id}`)
      .then((response) => {
        // Handle success
        // For example, redirect to contact list after successful deletion
        // history.push('/');
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Contact Details</h2>
      <p>Name: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Address: {contact.address}</p>
      <Link to={`/contacts/${id}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
      <br />
      <Link to="/">Back to Contact List</Link>
    </div>
  );
};

export default ContactDetails;

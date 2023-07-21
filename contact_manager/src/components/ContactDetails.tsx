// src/components/ContactDetails.tsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";

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
    <Card variant="outlined" style={{ margin: "20px auto", maxWidth: "400px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Contact Details
        </Typography>
        <Typography variant="body1">Name: {contact.name}</Typography>
        <Typography variant="body1">Email: {contact.email}</Typography>
        <Typography variant="body1">Phone: {contact.phone}</Typography>
        <Typography variant="body1">Address: {contact.address}</Typography>
        <Link to={`/contacts/${id}/edit`}>
          <Button variant="outlined" style={{ marginTop: "10px" }}>
            Edit
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="error"
          style={{ marginTop: "10px" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <br />
        <Link to="/">Back to Contact List</Link>
      </CardContent>
    </Card>
  );
};

export default ContactDetails;

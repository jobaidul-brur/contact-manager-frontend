// src/pages/EditContact.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <Card variant="outlined" style={{ margin: "20px auto", maxWidth: "400px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Edit Contact
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Name"
              name="name"
              value={contact.name}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Email"
              name="email"
              value={contact.email}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Phone"
              name="phone"
              value={contact.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Address"
              name="address"
              value={contact.address}
              onChange={handleInputChange}
              multiline
              fullWidth
            />
          </div>
          <Button
            type="submit"
            variant="outlined"
            style={{ marginTop: "10px" }}
          >
            Update Contact
          </Button>
          <br />
          <Link to={`/contacts/${id}`}>Back to Contact Details</Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditContact;

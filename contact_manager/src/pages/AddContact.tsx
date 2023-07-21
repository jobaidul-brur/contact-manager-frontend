// src/pages/AddContact.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

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
    <Card variant="outlined" style={{ margin: "20px auto", maxWidth: "400px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Add Contact
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
            Add Contact
          </Button>
        </form>
        <Link to="/">Back to Contact List</Link>
      </CardContent>
    </Card>
  );
};

export default AddContact;

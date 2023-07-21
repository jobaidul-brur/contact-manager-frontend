// src/pages/AddContact.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import useCreateContact from "../hooks/useCreateContact";

const AddContact: React.FC = () => {
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

  const { createContact, error } = useCreateContact();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createContact(contact);
    setContact({
      name: "",
      email: "",
      phone: "",
      address: "",
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
        {error && <div style={{ color: "red" }}>{error}</div>}
      </CardContent>
    </Card>
  );
};

export default AddContact;

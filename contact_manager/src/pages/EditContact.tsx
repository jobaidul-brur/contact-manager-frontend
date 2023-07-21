// src/pages/EditContact.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import useContactDetails from "../hooks/useContactDetails";
import useUpdateContact from "../hooks/useUpdateContact";

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
  const contact = useContactDetails(id);
  const [updatedContact, setUpdatedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (contact) {
      setUpdatedContact(contact);
    }
  }, [contact]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUpdatedContact((prevContact) => ({
      ...prevContact!,
      [name]: value,
    }));
  };

  const { updateContact, error } = useUpdateContact();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (updatedContact) {
      updateContact(id, updatedContact);
    }
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
              value={updatedContact?.name || contact.name}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Email"
              name="email"
              value={updatedContact?.email || contact.email}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Phone"
              name="phone"
              value={updatedContact?.phone || contact.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Address"
              name="address"
              value={updatedContact?.address || contact.address}
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
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </CardContent>
    </Card>
  );
};

export default EditContact;

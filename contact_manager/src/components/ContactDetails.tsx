// src/components/ContactDetails.tsx

import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import useContactDetails from "../hooks/useContactDetails";
import useDeleteContact from "../hooks/useDeleteContact";

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useContactDetails(id);

  const { deleteContact } = useDeleteContact();

  const handleDelete = () => {
    if (id) {
      deleteContact(id);
    }
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
          <Button
            variant="outlined"
            style={{ marginTop: "10px", marginRight: "5px" }}
          >
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
      </CardContent>
    </Card>
  );
};

export default ContactDetails;

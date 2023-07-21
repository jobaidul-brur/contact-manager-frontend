// src/components/ContactList.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    axios
      .get<Contact[]>("http://localhost:8000/api/contacts/")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  return (
    <Card variant="outlined" style={{ margin: "20px auto", maxWidth: "400px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Contact List
        </Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <Link to={`/contacts/${contact.id}`}>
                <Typography variant="body1">
                  {contact.name} - {contact.phone}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
        <Link to="/add">
          <Button variant="outlined" style={{ marginTop: "10px" }}>
            Add Contact
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ContactList;

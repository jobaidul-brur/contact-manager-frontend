// src/components/ContactList.tsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import useContacts from "../hooks/useContacts";

// interface Contact {
//   id: number;
//   name: string;
//   phone: string;
// }

const ContactList: React.FC = () => {
  const contacts = useContacts();

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

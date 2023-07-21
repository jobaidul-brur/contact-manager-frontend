// src/components/ContactList.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`}>
              {contact.name} - {contact.phone}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add Contact</Link> {/* Link to the AddContact page */}
    </div>
  );
};

export default ContactList;

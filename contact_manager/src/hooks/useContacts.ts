// src/hooks/useContacts.ts

import { useState, useEffect } from "react";
import axios from "axios";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const useContacts = () => {
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

  return contacts;
};

export default useContacts;

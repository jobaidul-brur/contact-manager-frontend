// src/hooks/useContactDetails.ts

import { useState, useEffect } from "react";
import axios from "axios";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const useContactDetails = (id?: string) => {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    axios
      .get<Contact>(`https://localhost:8000/api/contacts/${id}`)
      .then((response) => {
        setContact(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact details:", error);
      });
  }, [id]);

  return contact;
};

export default useContactDetails;

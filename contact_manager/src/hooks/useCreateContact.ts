// src/hooks/useCreateContact.ts

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Contact {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const useCreateContact = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const createContact = (contact: Contact) => {
    axios
      .post("https://localhost:8000/api/contacts/", contact)
      .then((response) => {
        // Handle success
        // For example, navigate to contact details after successful creation
        navigate(`/contacts/${response.data.id}`);
      })
      .catch((error) => {
        setError("Error creating contact: " + error.message);
      });
  };

  return { createContact, error };
};

export default useCreateContact;

// src/hooks/useUpdateContact.ts

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Contact {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const useUpdateContact = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const updateContact = (id?: string, contact?: Contact) => {
    axios
      .put(`http://localhost:8000/api/contacts/${id}`, contact)
      .then(() => {
        // Handle success
        // For example, navigate to contact details after successful update
        navigate(`/contacts/${id}`);
      })
      .catch((error) => {
        setError("Error updating contact: " + error.message);
      });
  };

  return { updateContact, error };
};

export default useUpdateContact;

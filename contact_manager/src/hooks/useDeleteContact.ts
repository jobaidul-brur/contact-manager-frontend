// src/hooks/useDeleteContact.ts

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const useDeleteContact = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const deleteContact = (id: string) => {
    axios
      .delete(`http://localhost:8000/api/contacts/${id}`)
      .then(() => {
        // Handle success
        // For example, redirect to contact list after successful deletion
        navigate("/");
      })
      .catch((error) => {
        setError("Error deleting contact: " + error.message);
      });
  };

  return { deleteContact, error };
};

export default useDeleteContact;

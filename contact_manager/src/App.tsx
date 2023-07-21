// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>Contact Management App</h1>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/contacts/:id/edit" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

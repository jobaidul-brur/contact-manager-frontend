// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  CssBaseline,
  Paper,
} from "@mui/material";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Button
            component={Link}
            to="/"
            color="inherit"
            // sx={{ marginRight: "12px" }}
          >
            Home
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contact Manager
          </Typography>
          <Button component={Link} to="/add" color="inherit">
            Add Contact
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        component={Paper}
        elevation={3}
        maxWidth="md"
        sx={{ padding: "24px", marginTop: "5px" }}
      >
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/contacts/:id/edit" element={<EditContact />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

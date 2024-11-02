// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar'; // Odkaz na tvůj navbar
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/UserContext';
import AddContact from "./pages/AddContact";
import ContactDetails from './pages/ContactDetails';
import EditContact from './pages/EditContact';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-contact" element={<AddContact />} />
                    <Route path="/contact-details/:contactId" element={<ContactDetails />} />
                    <Route path="/edit-contact/:contactId" element={<EditContact />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;

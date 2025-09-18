import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList.jsx";
import Login from "./components/Login.jsx"; // Asegúrate de crear este componente
import "./App.css";
import axios from "axios";
import AdminPage from "./components/AdminPage";
import Create_Product from './components/Create_Product';
import Edit_Product from './components/Edit_Product';
import Delete_Product from './components/Delete_Product';

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/create" element={<Create_Product />} />
            <Route path="/edit/:id_producto" element={<Edit_Product />} />
            <Route path="/delete/:id_producto" element={<Delete_Product />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

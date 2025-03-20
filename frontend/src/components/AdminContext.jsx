import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setAdmin(decoded);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ admin }}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

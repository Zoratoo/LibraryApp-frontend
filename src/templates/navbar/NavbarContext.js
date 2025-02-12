import React, { createContext, useState, useContext } from 'react';

const NavbarContext = createContext();

export const useNavbar = () => {
  return useContext(NavbarContext);
};

export const NavbarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <NavbarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </NavbarContext.Provider>
  );
};

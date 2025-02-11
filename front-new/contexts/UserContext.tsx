import React, { createContext, useState, useContext } from "react";

// Criação do contexto
export const UserContext = createContext({});

// Provider que encapsula a lógica de estado e fornece acesso global
function UserProvider({ children }){
  const [user, setUser] = useState({
    gender: '',
    birthDate: '',
    weight: 0,
    height: 0,
    actvLevel: '',
    goal: '',
    protGoal: 0,
    carbGoal: 0,
    fatGoal: 0,
    calGoal: 0,
  });

  const updateUser = (key, value) => {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

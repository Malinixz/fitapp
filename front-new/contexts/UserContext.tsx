import React, { createContext, useState, useContext } from "react";

// Criação do contexto
export const UserContext = createContext({});

// Provider que encapsula a lógica de estado e fornece acesso global
function UserProvider({ children }){
  const [user, setUser] = useState({
    gender: '',
    birthDate: '',
    weight: '',
    height: '',
    actvLevel: '',
    goal: '',
    protGoal: '',
    carbGoal: '',
    fatGoal: '',
    calGoal: '',
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

// Importa createContext e useState do React
import { createContext, useState } from "react";

// Cria um contexto de autenticação chamado AuthContext
export const AuthContext = createContext();

// Define o AuthProvider que envolverá os componentes filhos e fornecerá o contexto de autenticação
export const AuthProvider = function ({ children }) {
  // Define o estado isAuthenticated com base no valor armazenado no localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isLoggedIn")
  );
  // Função de login que armazena "isLoggedIn" no localStorage e define isAuthenticated como true
  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  };
  // Função de registro que armazena "isLoggedIn" no localStorage e define isAuthenticated como true
  const registrar = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  }
  // Função de logout que remove "isLoggedIn" do localStorage e define isAuthenticated como false
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  // Retorna o AuthContext.Provider que fornece o valor do contexto e envolve os componentes filhos
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

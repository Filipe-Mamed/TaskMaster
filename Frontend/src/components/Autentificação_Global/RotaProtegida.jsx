import { useContext } from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Autentificação_Global/AuthContext";

// Define o componente RotaProtegida que protegerá rotas específicas
export const RotaProtegida = function ({redirectPath = "/minhastarefas", children }) {
  // Obtém o valor isAuthenticated do contexto de autenticação
    const { isAuthenticated } = useContext(AuthContext);
    // Verifica se o usuário está autenticado
    if(isAuthenticated) {
      // Se estiver autenticado, redireciona para o caminho especificado em redirectPath
        return <Navigate to={redirectPath} replace/>
    }
    // Se não estiver autenticado, renderiza os componentes filhos ou o Outlet (para renderizar sub-rotas)
  return(
   children ? children : <Outlet />
  )
}

export default RotaProtegida;
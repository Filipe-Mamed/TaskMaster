import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Obtém a URL base da API das variáveis de ambiente

const api = axios.create({
    baseURL: apiBaseUrl, // Define a URL base para as requisições
    timeout: 5000, // Define um tempo limite de 5000ms (5 segundos) para as requisições
    withCredentials: true, // Inclui cookies nas requisições
    headers:{
        'Content-Type': 'application/json' // Define o cabeçalho 'Content-Type' para 'application/json'
    },
})

export default api
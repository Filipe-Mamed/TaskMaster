import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Importa componentes do Recharts para criar gráficos de barras

// Estiliza o contêiner principal da página
const Container = styled.div`
  padding: 2rem;
  background-color: #f0f2f5;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;
// Estiliza o contêiner dos gráficos
const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`;
// Estiliza cada gráfico
const ChartWrapper = styled.div`
  margin: 1rem;
  width: 100%;
  height: 300px;
  min-width: 280px;

  
`;
// Estiliza a lista de tarefas
const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;
// Estiliza cada item da lista de tarefas
const ListItem = styled.li`
  background: #fff;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  white-space: nowrap;      
  overflow: hidden;        
  text-overflow: ellipsis;  
  width: 100%;              
  max-width: 100%;
`;

function Dashboard() {
  // Define o estado 'dados' e a função para atualizá-lo
  const [dados, setDados] = useState({});

  // useEffect para carregar os dados do dashboard ao montar o componente
  useEffect(() => {
    api
      .get("/dashboard/dados") // Faz uma requisição GET à API para obter os dados do dashboard
      .then((res) => {
        setDados(res.data); // Atualiza o estado 'dados' com os dados recebidos
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message); // Exibe uma notificação de erro com a mensagem do backend
        }
        else {
          toast.error("Erro ao carregar os dados, tente novamente."); // Exibe uma notificação de erro
        } // Exibe uma notificação de erro
      });
  }, []);

  // Formata os dados para o gráfico de barras
  const data = [
    { name: "Concluídas", tarefas: dados.tarefasConcluidas?.length || 0 },
    { name: "Em Progresso", tarefas: dados.tarefasEmProgresso?.length || 0 },
    { name: "Pendentes", tarefas: dados.tarefasPendentes?.length || 0 },
  ];

  return (
    <Container>
      <h2>Dashboard</h2>
      <ChartContainer>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{ value: "Tarefas", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="tarefas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartContainer>

      <h3>Tarefas Concluídas</h3>
      <List>
        {dados.tarefasConcluidas?.length === 0 ? (
          <p className="fs-5 fw-medium text-muted">
            Não há tarefas disponíveis.
          </p>
        ) : (
          dados.tarefasConcluidas?.map((tarefa) => (
            <ListItem key={tarefa._id}>{tarefa.titulo}</ListItem>
          ))
        )}
      </List>

      <h3>Tarefas em Progresso</h3>
      <List>
        {dados.tarefasEmProgresso?.length === 0 ? (
          <p className="fs-5 fw-medium text-muted">
            Não há tarefas disponíveis.
          </p>
        ) : (
          dados.tarefasEmProgresso?.map((tarefa) => (
            <ListItem key={tarefa._id}>{tarefa.titulo}</ListItem>
          ))
        )}
      </List>

      <h3>Tarefas Pendentes</h3>
      <List>
        {dados.tarefasPendentes?.length === 0 ? (
          <p className="fs-5 fw-medium text-muted">
            Não há tarefas disponíveis.
          </p>
        ) : (
          dados.tarefasPendentes?.map((tarefa) => (
            <ListItem key={tarefa._id}>{tarefa.titulo}</ListItem>
          ))
        )}
      </List>
    </Container>
  );
}

export default Dashboard;

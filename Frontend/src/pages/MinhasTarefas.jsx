import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import styled from "styled-components";
import ProgressBar from "../layouts/ProgressBar";
import CancelarButton from "../components/form/CancelarButton";
import LinkBotao2 from "../components/Estilo_Botao/LinkBotao2";
import EstiloStatus from "../components/Estilo_Status/EstiloStatus";
import BarraDePesquisa from "../components/Estilo_BarraPesquisa/BarraDePesquisa";
import moment from "moment-timezone";

// Estiliza o contêiner principal da página
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f2f5;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;
// Estiliza o cabeçalho
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
// Estiliza o título
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #343a40;

  @media (max-width: 600px) {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;
// Estiliza o contêiner do cartão de tarefa
const CardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 1.5rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-decoration: none;
  color: #212529;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0.75rem 0;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin: 0.5rem 0;
  }
`;
// Estiliza o link do cartão de tarefa
const CardLink = styled(Link)`
  text-decoration: none;
  color: #212529;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-5px);
  }
`;
// Estiliza o título do cartão de tarefa
const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #212529;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;
// Estiliza o texto do cartão de tarefa
const CardText = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: #6c757d;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

function MinhasTarefas() {
  // Define o estado 'tarefas' e a função para atualizá-lo
  const [tarefas, setTarefas] = useState([]);
  // Define o estado 'pesquisaConsulta' e a função para atualizá-lo
  const [pesquisaConsulta, setpesquisaConsulta] = useState("");
  // Define o estado 'loading' e a função para atualizá-lo
  const [loading, setLoading] = useState(true);
  // Obtém a função 'navigate' do hook useNavigate
  const navigate = useNavigate();

  // useEffect para carregar as tarefas ao montar o componente
  useEffect(() => {
    api
      .get("/tarefas") // Faz uma requisição GET à API para obter as tarefas
      .then((res) => {
        setTarefas(res.data); // Atualiza o estado 'tarefas' com os dados recebidos
        setLoading(false); // Define 'loading' como false
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          toast.error(err.reponse.data.message); // Exibe uma notificação de erro
        } else {
          setLoading(false);
        } // Define 'loading' como false
      });
  }, []);

  // Função para excluir uma tarefa
  function excluirTarefa(id) {
    api
      .delete(`/tarefas/${id}`) // Faz uma requisição DELETE à API para excluir a tarefa
      .then(() => {
        const novasTarefas = tarefas.filter((tarefa) => tarefa._id !== id); // Filtra a tarefa excluída
        setTarefas(novasTarefas); // Atualiza o estado 'tarefas'
        toast.success("Tarefa excluída com sucesso!"); // Exibe uma notificação de sucesso
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Erro ao excluir a tarefa", err);
        } // Exibe uma notificação de erro
      });
  }
  // Filtra as tarefas com base na pesquisa
  const tarefasFiltradas = tarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(pesquisaConsulta.toLowerCase())
  );
  // Formata a data para o formato brasileiro
  const formatarDataBrasileira = (data) => {
    return moment(data).tz("America/Sao_Paulo").format("DD/MM/YYYY");
  };

  return (
    <Container>
      <Header>
        <Title>Minhas Tarefas</Title>{" "}
          <LinkBotao2 text="Nova tarefa" to="/novatarefa" />
      </Header>
      <BarraDePesquisa
        pesquisaConsulta={pesquisaConsulta}
        setpesquisaConsulta={setpesquisaConsulta}
      />
      {loading ? (
        <ProgressBar />
      ) : tarefas.length === 0 ? (
        <p className="bst fs-5 fw-medium">Não há tarefas disponíveis.</p>
      ) : (
        tarefasFiltradas.map((tarefa) => (
          <CardContainer key={tarefa._id}>
            <CardLink to={`/tarefas/${tarefa._id}`}>
              <CardTitle>{tarefa.titulo}</CardTitle>
              <CardText>
                Status: {tarefa.status} <EstiloStatus status={tarefa.status} />
              </CardText>
              <hr />
              <CardText>
                Data de Conclusão:{" "}
                {tarefa.dataConclusao
                  ? formatarDataBrasileira(tarefa.dataConclusao)
                  : "Não informada"}
              </CardText>
            </CardLink>
            <button
              className="btn btn-danger mt-3"
              onClick={() => excluirTarefa(tarefa._id)}
            >
              Excluir
            </button>
          </CardContainer>
        ))
      )}
    </Container>
  );
}

export default MinhasTarefas;

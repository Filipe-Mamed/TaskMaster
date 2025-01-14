import Input from "../components/form/input";
import Select from "../components/form/Select";
import SubmitButton from "../components/form/SubmitButton";
import styled from "styled-components";
import api from "../services/api";
import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import CancelarButton from "../components/form/CancelarButton";
import { toast } from "react-toastify";
import moment from "moment-timezone";

// Estiliza o contêiner principal da página
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 4rem 1rem;
`;
// Estiliza o cartão de formulário
const Card = styled.div`
  width: 100%;
  max-width: 600px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;
// Estiliza o corpo do cartão de formulário
const CardBody = styled.div`
  padding: 2rem;
`;
// Estiliza o título do cartão de formulário
const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;
// Estiliza o formulário
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
// Estiliza o grupo de formulário
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;
// Estiliza o grupo de botões
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;


function NovaTarefa() {
  // Define o estado inicial da tarefa
  const [tarefa, setTarefa] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    status: "",
    dataConclusao: "",
  });
  // Define o estado inicial das categorias
  const [categorias, setCategorias] = useState([]);
   // Hook para navegação programática
  const navigate = useNavigate();

  // Busca categorias da API quando o componente é montado
  useEffect(function () {
    api
      .get("/categorias")
      .then(function (res) {
        const categoriaComPlaceholder = [
          { value: "", label: "Selecione uma categoria:" },
          ...res.data.map(function (categoria) {
            return {
              value: categoria._id,
              label: categoria.nome,
            };
          }),
        ];
        setCategorias(categoriaComPlaceholder);
      })
      .catch(function (err) {
        console.error("Erro ao buscar categorias: ", err);
      });
  }, []);

  // Atualiza o estado da tarefa quando os campos do formulário são alterados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarefa((prevState) => ({ ...prevState, [name]: value }));
  };

  // Cria a nova tarefa ao enviar o formulário e exibe notificações
  const criarTarefa = function (e) {
    e.preventDefault();


    const tarefaData = {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      categoria: tarefa.categoria,
      status: tarefa.status,
      dataConclusao: tarefa.dataConclusao,
    };

    api
      .post("/tarefas", tarefaData)
      .then(function (res) {
        navigate(res.data.redirectTo);
        toast.success("Tarefa criada com sucesso!");
      })
      .catch(function (err) {
        if (err.response && err.response.data && err.response.data.erros) {
          err.response.data.erros.forEach((erro) => {
            toast.error(erro.message);
          });
        } else {
          toast.error("Erro ao criar tarefa!");
        }
      });
  };
  // Define as opções de status disponíveis
  const statusOptions = [
    { value: "", label: "Selecione um status:" },
    { value: "Pendente", label: "Pendente" },
    { value: "Em progresso", label: "Em Progresso" },
    { value: "Concluída", label: "Concluída" },
  ];

  return (
    <Container>
      <Card>
        <CardBody>
          <CardTitle>Nova Tarefa</CardTitle>
          <Form onSubmit={criarTarefa}>
            <FormGroup className="form-group">
              <Input
                label="Título:"
                type="text"
                name="titulo"
                value={tarefa.titulo}
                onChange={handleChange}
                placeholder="Digite um título"
                className="form-control"
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Input
                label="Descrição:"
                type="textarea"
                name="descricao"
                value={tarefa.descricao}
                onChange={handleChange}
                rows={3}
                placeholder="Coloque uma descrição!"
                className="form-control"
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Select
                text="Categoria:"
                name="categoria"
                value={tarefa.categoria}
                onChange={handleChange}
                className="form-control"
                placeholder="Selecione uma categoria"
                options={categorias}
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Select
                text="Status:"
                name="status"
                className="form-control"
                value={tarefa.status}
                onChange={handleChange}
                options={statusOptions}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Data de Conclusão:"
                type="date"
                name="dataConclusao"
                value={tarefa.dataConclusao}
                onChange={handleChange}
                className="form-control"
              />
            </FormGroup>
            <ButtonGroup>
              <CancelarButton to="/minhastarefas" text="Cancelar" />
              <SubmitButton text="Salvar" />
            </ButtonGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default NovaTarefa;

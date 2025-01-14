import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import styled from "styled-components";
import EstiloStatus from "../components/Estilo_Status/EstiloStatus";
import Input from "../components/form/input";
import Select from "../components/form/Select";
import SubmitButton from "../components/form/SubmitButton";
import Dropdown from "../components/Estilo_Dropdown/Dropdown";
import moment from "moment-timezone";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Card = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #343a40;
  text-align: center;
`;

const CardText = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #6c757d;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ButtonGroupB = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
`;

const CardSeparator = styled.div`
  margin: 1.5rem 0;
  border-bottom: 1px solid #ddd;
`;

function DetalhesTarefas() {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState({});
  const [editar, setEditar] = useState(false);
  const [editarStatus, setEditarStatus] = useState(false);
  const [valorOriginal, setValorOriginal] = useState({});
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    api
      .get(`/tarefas/${id}`)
      .then((res) => {
        setTarefa(res.data);
        setValorOriginal({
          titulo: res.data.titulo,
          descricao: res.data.descricao,
          categoria: res.data.categoria,
          status: res.data.status,
          dataConclusao: res.data.dataConclusao,
        });
      })
      .catch((err) => {
        toast.error("Erro ao carregar a tarefa!", err);
      });
  }, [id]);

  const excluirTarefa = (id) => {
    api
      .delete(`/tarefas/${id}`)
      .then(() => {
        toast.success("Tarefa excluída com sucesso!");
        navigate("/minhastarefas");
      })
      .catch((err) => {
        toast.error("Erro ao excluir a tarefa!", err);
      });
  };

  const resetTarefa = () => {
    setTarefa({ ...valorOriginal });
  };

  const toggleEditar = () => {
    setEditar(!editar);
    if (!editar) setEditarStatus(false);
  };

  const toggleEditarStatus = () => {
    setEditarStatus(!editarStatus);
    if (!editarStatus) setEditar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarefa((prevState) => ({ ...prevState, [name]: value }));
  };

  const salvarEdicao = (e) => {
    e.preventDefault();

    if (!tarefa.titulo) {
      tarefa.titulo = valorOriginal.titulo;
    }
    if (!tarefa.descricao) {
      tarefa.descricao = valorOriginal.descricao;
    }
    if (!tarefa.categoria) {
      tarefa.categoria = valorOriginal.categoria;
    }
    if (!tarefa.dataConclusao) {
      tarefa.dataConclusao = valorOriginal.dataConclusao;
    }

    const dadosAtualizados = {
      titulo: tarefa.titulo || valorOriginal.titulo,
      descricao: tarefa.descricao || valorOriginal.descricao,
      categoria: tarefa.categoria || valorOriginal.categoria,
      dataConclusao: tarefa.dataConclusao || valorOriginal.dataConclusao,
    };

    setTarefa(dadosAtualizados);

    api
      .put(`/tarefas/${id}`, dadosAtualizados)
      .then(() => {
        toast.success("Tarefa alterada com sucesso!");
        return api.get(`/tarefas/${id}`)
      })
      .then((res) => {
        setTarefa(res.data);
        setValorOriginal(res.data);
        setEditar(false);
      })
      .catch((err) => {
        toast.error("Erro ao editar a tarefa!", err);
        setTarefa({ ...valorOriginal });
      });
  };

  const salvarStatus = (e) => {
    e.preventDefault();

    if (!tarefa.status) {
      tarefa.status = valorOriginal.status;
    }

    const dadosAtualizados = {};
    if (tarefa.status !== valorOriginal.status)
      dadosAtualizados.status = tarefa.status;

    api
      .put(`/tarefas/${id}`, dadosAtualizados)
      .then(() => {
        toast.success("Status alterado com sucesso!");
        setEditarStatus(false);
      })
      .catch((err) => {
        toast.error("Erro ao alterar status!", err);
      });
  };

  const formatarDataBrasileira = (data) => {
    return moment(data).tz("America/Sao_Paulo").format("DD/MM/YYYY");
  };

  const statusOptions = [
    { value: "", label: "Selecione um status:" },
    { value: "Pendente", label: "Pendente" },
    { value: "Em progresso", label: "Em Progresso" },
    { value: "Concluída", label: "Concluída" },
  ];

  return (
    <Container>
      <Header>
        <h1>Detalhes da Tarefa</h1>
        <Dropdown
          toggleEditar={toggleEditar}
          toggleEditarStatus={toggleEditarStatus}
          editar={editar}
          editarStatus={editarStatus}
          resetTarefa={resetTarefa}
        />
      </Header>
      {editarStatus ? (
        <Card>
          <CardBody>
            <CardTitle>Editar Status</CardTitle>
            <Form onSubmit={salvarStatus}>
              <FormGroup>
                <Select
                  text="Status:"
                  name="status"
                  className="form-control"
                  value={tarefa.status || ""}
                  onChange={handleChange}
                  options={statusOptions}
                />
                <ButtonGroup>
                  <SubmitButton text="Salvar" />
                </ButtonGroup>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      ) : editar ? (
        <Card>
          <CardBody>
            <CardTitle>Editar Tarefa</CardTitle>
            <Form onSubmit={salvarEdicao}>
              <FormGroup>
                <Input
                  label="Título:"
                  type="text"
                  name="titulo"
                  value={tarefa.titulo || ""}
                  onChange={handleChange}
                  placeholder="Digite um título"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  label="Descrição:"
                  type="textarea"
                  name="descricao"
                  value={tarefa.descricao || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Coloque uma descrição!"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Select
                  text="Categoria:"
                  name="categoria"
                  value={tarefa.categoria || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Selecione uma categoria"
                  options={categorias}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  label="Data de Conclusão:"
                  type="date"
                  name="dataConclusao"
                  value={tarefa.dataConclusao || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </FormGroup>
              <ButtonGroup>
                <SubmitButton text="Salvar" />
              </ButtonGroup>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardTitle>{tarefa.titulo}</CardTitle>
          <CardSeparator />
          <CardText className="text-center">Descrição:</CardText>
          <CardText className="text-center">{tarefa.descricao}</CardText>
          <CardSeparator />
          <div className="d-flex justify-content-between">
            <CardText>
              Status: {tarefa.status} <EstiloStatus status={tarefa.status} />
            </CardText>
            <CardText>
              Categoria:{" "}
              {tarefa.categoria
                ? tarefa.categoria.nome
                : "Categoria indefinida"}
            </CardText>
          </div>
          <CardSeparator />
          <CardText>
            Data de Criação: {formatarDataBrasileira(tarefa.dataCriacao)}
          </CardText>
          <CardText>
            Data de Conclusão:{" "}
            {tarefa.dataConclusao
              ? formatarDataBrasileira(tarefa.dataConclusao)
              : "Não informada"}
          </CardText>
          <CardSeparator />
          {!editar && !editarStatus && (
            <ButtonGroupB>
              <button
                className="btn btn-danger mt-3"
                onClick={() => excluirTarefa(tarefa._id)}
              >
                Excluir
              </button>
            </ButtonGroupB>
          )}
        </Card>
      )}
    </Container>
  );
}

export default DetalhesTarefas;

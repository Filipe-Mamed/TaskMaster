import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskMaster from "./pages/TaskMaster";
import Navbar from "./layouts/Navbar";
import NovaTarefa from "./pages/NovaTarefa";
import Footer from "./layouts/Footer";
import MinhasTarefas from "./pages/MinhasTarefas";
import ContainerShowMessage from "./layouts/ContainerShowMessage";
import DetalhesTarefas from "./pages/DetalhesTarefa";
import CriarFeedback from "./pages/CriarFeedback";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ContainerShowMessage />
        <Routes>
          <Route path="/" element={<TaskMaster />} />
          <Route path="/novatarefa" element={<NovaTarefa />} />
          <Route path="/minhastarefas" element={<MinhasTarefas/>} />
          <Route path="/tarefas/:id" element={<DetalhesTarefas/>}/>
          <Route path="/feedback" element={<CriarFeedback/>}/>
          <Route path="/dados" element={<Dashboard/>}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Estiliza o contêiner da barra de progresso
const Progress = styled.div`
  width: 100%;
  height: 30px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px 0;
`;
// Estiliza a barra de progresso
const ProgressBarStyled = styled.div`
  height: 100%;
  background-color: #007bff;
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

function ProgressBar() {
   // Define o estado 'progress' e a função para atualizá-lo, iniciando em 0
  const [progress, setProgress] = useState(0);
  // useEffect para incrementar o progresso a cada 100ms
  useEffect(() => {
    // Define um intervalo que incrementa o progresso
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);
     // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    // Contêiner da barra de progresso com atributos de acessibilidade
    <Progress
      role="progressbar"
      aria-label="Exemplo dinâmico"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* Barra de progresso estilizada com a largura baseada no estado 'progress' */}
      <ProgressBarStyled style={{ width: `${progress}%` }}>
        {progress}%
      </ProgressBarStyled>
    </Progress>
  );
}

export default ProgressBar;

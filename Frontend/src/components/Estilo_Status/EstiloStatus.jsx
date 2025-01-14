import { FaCircle } from "react-icons/fa"

function EstiloStatus({status}){
     // Função que retorna o estilo baseado no status da tarefa
    function statusPorEstilo(status){
        if(status ==="Pendente"){
            return{color: "red"}
        }
        if(status === "Em progresso"){
            return{color: "yellow"}
        }

        if(status === "Concluída"){
            return{color: "green"}
        }
    }
    // Obtém o estilo baseado no status atual
    const estilo = statusPorEstilo(status)

     // Renderiza o ícone FaCircle com o estilo apropriado
    return(
            <FaCircle className="fs-6" style={estilo} />
    )
}

export default EstiloStatus

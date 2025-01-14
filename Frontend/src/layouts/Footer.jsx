import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styled from "styled-components";

// Estiliza o contêiner do rodapé
const FooterContainer = styled.footer`
  background-color: #000000;
  color: white;
  text-align: center;
  padding: 1rem 0;
  position: relative;
  bottom: 0;
  width: 100%;
`;
// Estiliza a lista de ícones sociais
const SocialList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0 0 1rem 0;
`;
// Estiliza cada item da lista social
const SocialItem = styled.li`
  margin: 0 1rem;
`;
// Estiliza os links dos ícones
const IconLink = styled(Link)`
  color: white;
  font-size: 2rem;
  transition: color 0.3s;
  &:hover {
    color: #007bff; /* Hover color */
  }
`;
// Estiliza o texto do rodapé
const FooterText = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
`;
// Estiliza o texto em destaque
const Highlight = styled.span`
  color: #ffc107; /* Cor em destaque */
  font-weight: bold;
`;

function Footer() {
  return (
    <FooterContainer> {/* Contêiner do rodapé */}
      <SocialList> {/* Lista de ícones sociais */}
        <SocialItem> 
          <IconLink to="https://www.linkedin.com/in/filipe-mamed/">
            <FaLinkedin /> {/* Ícone do LinkedIn */}
          </IconLink>
        </SocialItem>
        <SocialItem>
          <IconLink to="https://github.com/Filipe-Mamed">
            <FaGithub /> {/* Ícone do GitHub */}
          </IconLink>
        </SocialItem>
      </SocialList>
      <FooterText>
        <Highlight>TaskMaster</Highlight> &copy; 2025 {/* Texto com destaque e símbolo de copyright */}
      </FooterText>
      <FooterText>
        Todos os direitos reservados - Filipe Mamed - Dev Full Stack Jr. - Rio de Janeiro - RJ - Brasil - 2025 {/* Texto adicional do rodapé */}
      </FooterText>
    </FooterContainer>
  );
}

export default Footer;

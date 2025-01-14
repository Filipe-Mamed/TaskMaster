import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '/Logo.png';

const StyledLogo = styled.img`
  height: 100px;

  &:hover {
    cursor: pointer;
  }
`;

function Icon() {
  return (
    <Link to="/">
      <StyledLogo src={Logo} alt="Logo do TaskMaster" />
    </Link>
  );
}

export default Icon;

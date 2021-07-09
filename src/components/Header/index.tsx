import React from "react";

import { Link } from "react-router-dom";
import { GiFarmTractor, GiFarmer } from "react-icons/gi";
import { Container } from "./styles";

import Logo from "../../assets/logo.png";

interface HeaderProps {
  size?: "small" | "large";
}

const Header: React.FC<HeaderProps> = ({ size = "large" }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="My Farm" />

      <nav>
        <Link to="/">
          <GiFarmer size={30}/>
        </Link>
        <Link to="/ruralProperty">
          <GiFarmTractor size={30}/>
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;

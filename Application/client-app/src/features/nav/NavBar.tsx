import React from "react";
import { Container, Menu, Icon } from "semantic-ui-react";
import LoginLogoutButton from "./LoginLogoutButton";

const NavBar = () => {
  return (
    <Menu
      fixed="top"
      inverted
      icon
      size="large"
      borderless
      style={{ height: "50px", background: "#266EB2" }}
    >
      <Container fluid>
        <Menu.Item>
          <Icon name="cloud" size="large" />
        </Menu.Item>
        <Menu.Item header>System Gromadzenia Danych Sensorycznych</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <LoginLogoutButton />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default NavBar;

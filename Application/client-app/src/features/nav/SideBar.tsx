import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Sidebar } from "semantic-ui-react";

const SideBar = () => {
  return (
    <Sidebar
      style={{ top: "50px" }}
      as={Menu}
      animation="overlay"
      direction="left"
      icon="labeled"
      fixed="left"
      vertical
      visible={true}
      width="thin"
      borderless
    >
      <Menu.Item name="home" as={NavLink} exact to="/">
        <Icon name="home" />
        Strona główna
      </Menu.Item>
      <Menu.Item name="devices" as={NavLink} to="/devices">
        <Icon name="hdd" />
        Urządzenia IoT
      </Menu.Item>
      <Menu.Item name="stored-data" as={NavLink} to="/stored-data">
        <Icon name="database" />
        Zgromadzone dane
      </Menu.Item>
      <Menu.Item name="analyse" as={NavLink} to="/analyse">
        <Icon name="chart bar" />
        Analiza danych
      </Menu.Item>
    </Sidebar>
  );
};

export default SideBar;

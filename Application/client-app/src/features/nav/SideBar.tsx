import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon, Menu, MenuItemProps, Sidebar } from "semantic-ui-react";

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
      <Menu.Item name="home"  as={NavLink} exact to='/'>
        <Icon name="home" />
        Strona główna
      </Menu.Item>
      <Menu.Item name="devices"  as={NavLink} to='/devices'>
        <Icon name="hdd" />
        Urządzenia IoT
      </Menu.Item>
      <Menu.Item name="data" >
        <Icon name="database" />
        Zgromadzone dane
      </Menu.Item>
      <Menu.Item name="analyse" >
        <Icon name="chart bar" />
        Analiza danych
      </Menu.Item>
    </Sidebar>
  );
};

export default SideBar;

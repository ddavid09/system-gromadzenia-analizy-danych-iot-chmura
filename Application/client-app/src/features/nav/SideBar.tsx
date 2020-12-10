import React, { useState } from "react";
import { Header, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

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
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={(e) => handleItemClick("home")}
      >
        <Icon name="home" />
        Strona główna
      </Menu.Item>
      <Menu.Item
        name="devices"
        active={activeItem === "devices"}
        onClick={(e) => handleItemClick("devices")}
      >
        <Icon name="hdd" />
        Urządzenia IoT
      </Menu.Item>
      <Menu.Item
        name="data"
        active={activeItem === "data"}
        onClick={(e) => handleItemClick("data")}
      >
        <Icon name="database" />
        Zgromadzone dane
      </Menu.Item>
      <Menu.Item
        name="analyse"
        active={activeItem === "analyse"}
        onClick={(e) => handleItemClick("analyse")}
      >
        <Icon name="chart bar" />
        Analiza danych
      </Menu.Item>
    </Sidebar>
  );
};

export default SideBar;

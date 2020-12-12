import React, { useState } from "react";
import { Icon, Menu, MenuItemProps, Sidebar } from "semantic-ui-react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps
  ) => {
    if (data.name) {
      setActiveItem(data.name);
    }
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
      <Menu.Item name="home" active={activeItem === "home"} onClick={handleItemClick}>
        <Icon name="home" />
        Strona główna
      </Menu.Item>
      <Menu.Item name="devices" active={activeItem === "devices"} onClick={handleItemClick}>
        <Icon name="hdd" />
        Urządzenia IoT
      </Menu.Item>
      <Menu.Item name="data" active={activeItem === "data"} onClick={handleItemClick}>
        <Icon name="database" />
        Zgromadzone dane
      </Menu.Item>
      <Menu.Item name="analyse" active={activeItem === "analyse"} onClick={handleItemClick}>
        <Icon name="chart bar" />
        Analiza danych
      </Menu.Item>
    </Sidebar>
  );
};

export default SideBar;

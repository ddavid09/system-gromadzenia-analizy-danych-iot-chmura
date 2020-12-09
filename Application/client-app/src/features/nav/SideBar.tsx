import React, { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <Menu icon vertical fixed="left" borderless>
      <Menu.Item name="sidebar"
      active={activeItem === 'sidebar'}
      onClick={(e) => handleItemClick("sidebar")}>
        <Icon name="sidebar" size="large" />
      </Menu.Item>

      <Menu.Item name="home"
      active={activeItem === 'home'}
      onClick={(e) => handleItemClick("home")}>
        <Icon name="home" size="large" />
      </Menu.Item>

      <Menu.Item name="add"
      active={activeItem === 'add'}
      onClick={(e) => handleItemClick("add")}>
        <Icon name="add" size="large" />
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;

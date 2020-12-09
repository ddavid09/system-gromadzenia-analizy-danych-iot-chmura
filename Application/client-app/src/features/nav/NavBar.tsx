import React, { useState } from "react";
import { Container, Menu, Segment, Icon } from "semantic-ui-react";

const NavBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <Segment inverted>
      <Menu fixed="top" inverted icon size="large" borderless>
        <Container fluid>
          <Menu.Item>
            <Icon name="cloud" size="large" />
          </Menu.Item>
          <Menu.Item header>System Gromadzenia Danych Sensorycznych</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              name="settings"
              active={activeItem === "settings"}
              onClick={(e) => handleItemClick("settings")}
            >
              <Icon name="setting" size="large" />
            </Menu.Item>
            <Menu.Item
              name="help"
              active={activeItem === "help"}
              onClick={(e) => handleItemClick("help")}
            >
              <Icon name="question" size="large" />
            </Menu.Item>
            <Menu.Item
              name="user"
              active={activeItem === "user"}
              onClick={(e) => handleItemClick("user")}
            >
              <Icon name="user" size="large" />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </Segment>
  );
};

export default NavBar;
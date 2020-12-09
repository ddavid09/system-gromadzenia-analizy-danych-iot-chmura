import React, { useState } from "react";
import { Header, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Sidebar.Pushable style={{ overflow: "hidden" }}>
        <Sidebar
          as={Menu}
          animation="push"
          direction="left"
          icon="labeled"
          vertical
          visible={true}
          width="thin"
        >
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic style={{ margin: "2em" }}>
            <Header as="h3">Application Content</Header>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default SideBar;

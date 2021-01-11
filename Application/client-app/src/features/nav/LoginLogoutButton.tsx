import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const LoginLogoutButton = () => {
  const { userStore } = useContext(RootStoreContext);
  const { Login, Logout, userAccount } = userStore;

  if (userAccount === null) {
    return <Button onClick={Login}>Zaloguj</Button>;
  } else {
    return (
      <Menu.Item>
        <h4 style={{ marginRight: "15px", paddingTop: "10px" }}>
          Zalogowany jako: {userAccount?.name}
        </h4>
        <Button onClick={Logout}>Wyloguj</Button>
      </Menu.Item>
    );
  }
};

export default observer(LoginLogoutButton);

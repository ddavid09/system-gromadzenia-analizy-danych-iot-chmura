import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Label, Menu } from "semantic-ui-react";
import { LanguageVariant } from "typescript";
import { RootStoreContext } from "../../app/stores/RootStore";

const LoginLogoutButton = () => {
  const { userStore } = useContext(RootStoreContext);
  const { Logged, Login, userAccount } = userStore;

  if (userAccount === null) {
    return <Button onClick={Login}>Zaloguj</Button>;
  } else {
    return (
      <Menu.Item>
        <Label color="green" size="large" style={{marginRight: "15px"}}>
          Zalogowany jako: {userAccount?.name}
        </Label>
        <Button>Wyloguj</Button>
      </Menu.Item>
    );
  }
};

export default observer(LoginLogoutButton);

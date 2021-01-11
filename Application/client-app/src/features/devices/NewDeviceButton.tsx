import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/RootStore";

const NewDeviceButton = () => {
  const { deviceStore } = useContext(RootStoreContext);
  const { creating, openCreateForm } = deviceStore;

  return (
    <Button
      icon
      style={{
        height: "165px",
        marginTop: "11px",
        marginLeft: "7px",
        width: "290px",
        padding: "10px",
      }}
      onClick={openCreateForm}
      loading={creating}
    >
      {creating && <LoadingComponent />}
      <Icon name="add" size="huge" />
    </Button>
  );
};

export default observer(NewDeviceButton);

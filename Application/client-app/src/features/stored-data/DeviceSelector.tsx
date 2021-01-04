import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const DeviceSelector = () => {
  const { deviceStore, storedDataStore } = useContext(RootStoreContext);
  const { dropdownDevicesOptions } = deviceStore;
  const { selectedDeviceId, loadTableValues, setDeviceId } = storedDataStore;

  return (
    <Dropdown
      placeholder="Wybierz urządzenie"
      fluid
      selection
      options={dropdownDevicesOptions}
      value={selectedDeviceId}
      onChange={setDeviceId}
      onClose={loadTableValues}
    />
  );
};

export default observer(DeviceSelector);

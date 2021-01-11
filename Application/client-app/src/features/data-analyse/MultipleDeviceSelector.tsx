import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const MultipleDeviceSelector = () => {
  const { deviceStore, analyseDataStore } = useContext(RootStoreContext);
  const { dropdownDevicesOptions, loadingInitial } = deviceStore;
  const { devicesIds, addDeviceId } = analyseDataStore;

  useEffect(() => {
    deviceStore.loadDevices();
  }, [deviceStore]);

  return (
    <Dropdown
      disabled={loadingInitial}
      placeholder="Wybierz urządzenia"
      fluid
      selection
      multiple
      options={dropdownDevicesOptions}
      value={devicesIds}
      onChange={addDeviceId}
    />
  );
};

export default observer(MultipleDeviceSelector);

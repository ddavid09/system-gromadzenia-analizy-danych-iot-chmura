import React, { useState, useEffect } from "react";
import { Card, Grid } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IDevice } from "../../../app/modules/device";
import DeviceForm from "./DeviceForm";
import DeviceCard from "./DeviceCard";
import NewDeviceButton from "./NewDeviceButton";

const DevicesDashboard: React.FC = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [EditDeviceLoading, setEditDeviceLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<String>("");
  const [loadingNew, setLoadingNew] = useState<boolean>(false);

  useEffect(() => {
    agent.Devices.getAll()
      .then((response) => {
        setDevices(response);
      })
      .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingComponent content="Ładowanie" />;

  const handleSubmit = (device: IDevice) => {
    if (selectedDevice) {
      setEditDeviceLoading(true);
      agent.Devices.update(device)
        .then(() => {
          let devicesArray = [...devices];
          const index = devicesArray.findIndex((d) => d.deviceId === device.deviceId);
          devicesArray[index] = device;
          setDevices([...devicesArray]);
        })
        .then(() => {
          setEditDeviceLoading(false);
          setTarget("");
        });
    } else {
      setLoadingNew(true);
      agent.Devices.create(device).then(() => {
        setDevices([...devices.filter((d) => d.deviceId !== device.deviceId), device]);
        setLoadingNew(false);
      });
    }
    setEditVisible(false);
  };

  const handleDelete = (device: IDevice) => {
    setEditDeviceLoading(true);
    agent.Devices.delete(device.deviceId)
      .then(() => setDevices([...devices.filter((d) => d.deviceId !== device.deviceId)]))
      .then(() => setEditDeviceLoading(false));
    if (selectedDevice && selectedDevice.deviceId === device.deviceId) {
      setEditVisible(false);
    }
  };

  return (
    <Grid style={{ paddingTop: "70px", marginLeft: "170px" }}>
      <Grid.Column width={9}>
        <Card.Group>
          {devices.map((device) => (
            <DeviceCard
              key={device.deviceId}
              device={device}
              handleSelection={(e, d) => {
                setSelectedDevice(device);
                setEditVisible(true);
                setTarget(d.name);
              }}
              loading={EditDeviceLoading && device.deviceId === target}
            />
          ))}
          <NewDeviceButton
            onClick={() => {
              setSelectedDevice(null);
              setEditVisible(true);
            }}
            loading={loadingNew}
          />
        </Card.Group>
      </Grid.Column>
      <Grid.Column width={3}>
        {editVisible && (
          <DeviceForm
            commingDevice={selectedDevice}
            cancelDevice={() => {
              setSelectedDevice(null);
              setEditVisible(false);
            }}
            deleteDevice={handleDelete}
            submitDevice={handleSubmit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default DevicesDashboard;

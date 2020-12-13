import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IDevice } from "../../../app/modules/device";
import DeviceForm from "../form/DeviceForm";
import DeviceCard from "../single-device/DeviceCard";

const DevicesDashboard: React.FC = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Devices.getAll()
      .then((response) => {
        console.log("api getAll");
        setDevices(response);
      })
      .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingComponent content="Ładowanie" />;

  const handleSubmit = (device: IDevice) => {
    if (selectedDevice) {
      agent.Devices.update(device).then(() => {
        let devicesArray = [...devices];
        const index = devicesArray.findIndex((d) => d.deviceId === device.deviceId);
        devicesArray[index] = device;
        setDevices([...devicesArray]);
      });
    } else {
      agent.Devices.create(device).then(() => {
        setDevices([...devices.filter((d) => d.deviceId !== device.deviceId), device]);
      });
    }
    setEditVisible(false);
  };

  const handleDelete = (device: IDevice) => {
    agent.Devices.delete(device.deviceId).then(() =>
      setDevices([...devices.filter((d) => d.deviceId !== device.deviceId)])
    );
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
              device={device}
              handleSelection={() => {
                setSelectedDevice(device);
                setEditVisible(true);
              }}
              loading={true}
            />
          ))}
          <Button
            icon
            style={{
              height: "168px",
              marginTop: "11px",
              marginLeft: "7px",
              width: "289px",
              padding: "10px",
            }}
            onClick={() => {
              setSelectedDevice(null);
              setEditVisible(true);
            }}
          >
            <Icon name="add" size="huge" />
          </Button>
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

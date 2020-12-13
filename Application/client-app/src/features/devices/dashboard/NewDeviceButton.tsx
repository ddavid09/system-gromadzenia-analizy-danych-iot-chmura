import React from 'react'
import { Button, Icon } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const NewDeviceButton:React.FC<{onClick:()=> void, loading: boolean}> = ({onClick, loading}) => {
    return (
        <Button
        
            icon
            style={{
              height: "168px",
              marginTop: "11px",
              marginLeft: "7px",
              width: "289px",
              padding: "10px",
            }}
            onClick={onClick}
            loading = {loading}
          >
              {loading && <LoadingComponent />}
            <Icon name="add" size="huge" />
          </Button>
    )
}

export default NewDeviceButton

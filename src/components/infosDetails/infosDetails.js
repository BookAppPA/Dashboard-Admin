import React from 'react';
import { Column } from 'simple-flexbox';
import { TextField } from '@material-ui/core';

function InfosDetails({ name, value }) {
    return (
        <Column style={{ marginRight: 10 }}>
            <h2>{name}</h2>
            <TextField
                style={{ marginRight: 10 }}
                disabled={true}
                fullWidth
                //label="Mail"
                value={value}
                variant="outlined"
            />
        </Column>
    );
}

export default InfosDetails;

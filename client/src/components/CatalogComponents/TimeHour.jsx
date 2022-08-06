import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function TimeHour({label}) {
    const realTime = Date.now()
    const [value, setValue] = React.useState(new Date(realTime));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label={label}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
    </LocalizationProvider>
    )
}

export default TimeHour
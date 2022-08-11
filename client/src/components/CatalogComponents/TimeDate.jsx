import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function TimeDate({ label, handleChangeDate, value, errorDate, msgErrDate }) {


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        inputFormat="yyyy/MM/dd"
        value={value}
        onChange={handleChangeDate}
        renderInput={(params) =>
          <TextField
            size="small" {...params}
            error={errorDate}
            helperText={msgErrDate}
            required />}
        disablePast
      />

    </LocalizationProvider>
  )
}

export default TimeDate
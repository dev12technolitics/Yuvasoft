import PropTypes from 'prop-types'
// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { TextField } from '@mui/material'
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

RHFMobileDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
}
export default function RHFMobileDatePicker({ name, label, ...other }) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label={label}
            control={control}
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={(event) => {
              onChange(event)
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '80px',
                    '&.Mui-focused fieldset legend': {},
                  },
                }}
                {...params}
                error={!!error}
                helperText={error?.message}
                {...other}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  )
}

RHFMobileDateTimePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
}

export function RHFMobileDateTimePicker({ name, label, ...other }) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateTimePicker
            label={label}
            control={control}
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={(event) => {
              onChange(event)
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '80px',
                    '&.Mui-focused fieldset legend': {},
                  },
                }}
                {...params}
                error={!!error}
                helperText={error?.message}
                {...other}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  )
}

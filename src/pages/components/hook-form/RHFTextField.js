import PropTypes from 'prop-types'
// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { TextField } from '@mui/material'

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
}

export default function RHFTextField({ name, helperText, ...other }) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: !other?.multiline ? '10px' : '10px',
              height: !other?.multiline && '52px',
              '&.Mui-focused fieldset legend': {},
            },
          }}
        />
      )}
    />
  )
}

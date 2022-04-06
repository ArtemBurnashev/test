import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { StyledInput, StyledLabel } from './input.styles';
import { InputProps } from './input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      label,
      helperText,
      required,
      fullWidth,
      id = 'Id',
      sx,
      endAdornment,
      name,
      type,
      ...otherProps
    },
    ref
  ) => {
    return (
      <FormControl
        error={error}
        variant="standard"
        fullWidth={fullWidth}
        required={required}
        sx={sx}
      >
        {label && (
          <StyledLabel htmlFor={id} shrink>
            {label}
          </StyledLabel>
        )}

        <StyledInput
          id={id}
          ref={ref}
          name={name}
          {...otherProps}
          endAdornment={endAdornment}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default Input;

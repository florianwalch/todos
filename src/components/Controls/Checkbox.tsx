import {
  type CheckboxProps as MuiCheckboxProps,
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
} from '@mui/material';

// type of component props
export type CheckboxProps = MuiCheckboxProps & {
  label?: string;
};

/**
 * Checkbox component for forms.
 *
 * Extends the MUI Checkbox component.
 *
 * Returns MuiCheckbox with default settings & wrapped
 * in MUI FormControl components.
 *
 * @param {CheckboxProps} componentProps - component props
 */
export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <FormControl margin="none" variant="standard">
      <FormControlLabel label={label} control={<MuiCheckbox {...props} />} />
    </FormControl>
  );
}

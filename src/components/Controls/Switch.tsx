import {
  FormControl,
  FormControlLabel,
  Switch as MuiSwitch,
  type SwitchProps as MuiSwitchProps,
} from '@mui/material';

export type SwitchProps = MuiSwitchProps & {
  label?: string;
};

/**
 * Switch component for forms.
 *
 * Extends the MUI Switch component.
 *
 * If label prop is set, component is wrapped
 * in FormControl component.
 *
 * @param {SwitchProps} componentProps - component props
 */
export function Switch({ label, ...props }: SwitchProps) {
  const switchComponent = <MuiSwitch {...props} />;

  // return component without FormControlLabel
  // if label is not set
  if (label == null) {
    return switchComponent;
  }

  return (
    <FormControl margin="none" variant="standard">
      <FormControlLabel label={label} control={switchComponent} />
    </FormControl>
  );
}

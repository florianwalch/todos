import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
  type UseControllerProps,
  Controller,
} from 'react-hook-form';

import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

// type of value transformer
type ValueTransformer<T> = {
  in: (val: PathValue<T, Path<T>>) => string;
  out: (val: string) => PathValue<T, Path<T>>;
};

// type of component props
type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: UseControllerProps['rules'];
  valueTransformer?: ValueTransformer<T>;
  TextFieldProps: MuiTextFieldProps;
};

/**
 * TextField component wrapped in RHF Controller.
 *
 * Name, control & rules props will be passed to the RFH Control component,
 * the remaining props go to the text field component, which is
 * the MuiTextField.
 *
 * Additionally, it's possible to provide a value transformer.
 * Example:
 * ```
 * <TextField
 *  valueTransformer={{
 *    in: (val) => ...,
 *    out: (val) => ...,
 *  }}
 * ```
 *
 * @param {TextFieldProps} componentProps - component props
 */
export function TextField<T extends FieldValues>({
  name,
  control,
  rules,
  valueTransformer,
  TextFieldProps,
}: TextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, value, onChange, ...fieldProps } }) => (
        <MuiTextField
          fullWidth
          margin="dense"
          variant="standard"
          inputRef={ref}
          value={valueTransformer != null ? valueTransformer.in(value) : value}
          onChange={(evt) => {
            const val = evt.target.value;
            onChange(
              valueTransformer != null ? valueTransformer.out(val) : val,
            );
          }}
          {...fieldProps}
          {...TextFieldProps}
        />
      )}
    />
  );
}

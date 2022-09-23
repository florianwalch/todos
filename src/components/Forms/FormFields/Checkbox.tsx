import {
  type Control,
  type FieldValues,
  type Path,
  type UseControllerProps,
  Controller,
} from 'react-hook-form';

import { Checkbox, type CheckboxProps } from '@/components/Controls/Checkbox';

// type of component props
type FormFieldCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: UseControllerProps['rules'];
  CheckboxProps: Partial<CheckboxProps>;
};

/**
 * Checkbox component wrapped in RHF Controller.
 *
 * Name, control & rules props will be passed to the RFH Control component,
 * the remaining props go to the checkbox component.
 *
 * @param {FormFieldCheckboxProps} componentProps - component props
 */
export function FormFieldCheckbox<T extends FieldValues>({
  name,
  control,
  rules,
  CheckboxProps: { label, ...props },
}: FormFieldCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ref, ...fieldProps } }) => (
        <Checkbox
          label={label}
          checked={!!value}
          onChange={(event) => onChange(event.target.checked)}
          inputRef={ref}
          {...props}
          {...fieldProps}
        />
      )}
    />
  );
}
